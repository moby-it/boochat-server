import { Meetup, Room, User, UserConnectedEvent, UserId } from '@boochat/domain';
import { QuerySocketEventsEnum } from '@boochat/shared';
import { EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { transformToPlain } from '../../common';
import { GetMeetupsQuery, GetMeetupsQueryResult } from '../../meetups';
import { GetRoomsWithLastItemQuery, GetRoomsWithLastItemQueryResult } from '../../rooms';
import { GetUsersQuery, GetUsersQueryResult } from '../../users';
@EventsHandler(UserConnectedEvent)
export class UserConnectedWsEventHandler implements IEventHandler<UserConnectedEvent> {
  constructor(private queryBus: QueryBus) {}
  async handle(event: UserConnectedEvent) {
    const { socket, userId } = event;
    const rooms = await this.getRooms(userId);
    this.userJoinsRooms(socket, rooms);
    socket.emit(QuerySocketEventsEnum.ROOM_LIST, transformToPlain(rooms));

    const meetups = await this.getMeetups(userId);
    this.userJoinsMeetups(socket, meetups);
    socket.emit(QuerySocketEventsEnum.MEETUP_LIST, transformToPlain(meetups));

    const users = await this.getAllUsers();
    socket.emit(QuerySocketEventsEnum.ALL_USERS, transformToPlain(users));
  }
  private userJoinsRooms(socket: Socket, rooms: Room[]) {
    for (const room of rooms) {
      socket.join(room.id);
    }
  }
  private userJoinsMeetups(socket: Socket, meetups: Meetup[]) {
    for (const meetup of meetups) {
      socket.join(meetup.id);
    }
  }
  private async getRooms(userId: UserId): Promise<Room[]> {
    const result = (await this.queryBus.execute(
      new GetRoomsWithLastItemQuery(userId)
    )) as GetRoomsWithLastItemQueryResult;
    if (result.failed) throw new WsException(result.error as any);
    return result.props as Room[];
  }
  private async getMeetups(userId: UserId): Promise<Meetup[]> {
    const result = (await this.queryBus.execute(new GetMeetupsQuery(userId))) as GetMeetupsQueryResult;
    if (result.failed) throw new WsException(result.error as any);
    return result.props as Meetup[];
  }
  private async getAllUsers() {
    const result = (await this.queryBus.execute(new GetUsersQuery())) as GetUsersQueryResult;
    if (result.failed) throw new WsException(result.error as any);
    return result.props as User[];
  }
}
