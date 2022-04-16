import { Room, UserConnectedEvent } from '@boochat/domain';
import { InternalServerErrorException } from '@nestjs/common';
import { EventsHandler, IEventHandler, QueryBus } from '@nestjs/cqrs';
import { Socket } from 'socket.io';
import { GetRoomsWithLastItemQuery, GetRoomsWithLastItemQueryResult } from '../../rooms';

@EventsHandler(UserConnectedEvent)
export class UserConnectedWsEventHandler implements IEventHandler<UserConnectedEvent> {
  constructor(private queryBus: QueryBus) {}
  async handle(event: UserConnectedEvent) {
    const { socket, userId } = event;
    const result = (await this.queryBus.execute(
      new GetRoomsWithLastItemQuery(userId)
    )) as GetRoomsWithLastItemQueryResult;
    if (result.failed) throw new InternalServerErrorException('failed to connect user');
    const userRooms = result.props as Room[];
    this.userJoinsRooms(socket, userRooms);
    socket.emit('MyRooms', userRooms);
  }
  private userJoinsRooms(socket: Socket, rooms: Room[]) {
    for (const room of rooms) {
      socket.join(room.id);
    }
  }
}
