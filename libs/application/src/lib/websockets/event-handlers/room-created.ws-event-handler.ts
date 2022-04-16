import { Room, RoomCreatedEvent } from '@boochat/domain';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { transformToPlain, WebsocketEventsEnum, WsServer } from '../../common';
import { ActiveUsersService } from '../../users';

@EventsHandler(RoomCreatedEvent)
export class RoomCreatedWsEventHandler implements IEventHandler<RoomCreatedEvent> {
  constructor(private activeUserService: ActiveUsersService) {}
  async handle(event: RoomCreatedEvent) {
    for (const userId of event.userIds) {
      this.activeUserService.connectUserToRoom(userId, event.id);
    }
    const sockets = await WsServer.instance.fetchSockets();
    const activeUserSocketIds = this.activeUserService.activeUserSocketIds;
    const activeSockets = sockets.filter((socket) => activeUserSocketIds.includes(socket.id));
    const room = Room.create(
      {
        name: event.roomName,
        items: [],
        participants: event.userIds.map((id) => ({ id })),
        imageUrl: event.imageUrl,
        hasUnreadMessage: true
      },
      event.id
    );
    for (const socket of activeSockets) {
      socket.emit(WebsocketEventsEnum.ROOM_CREATED, transformToPlain(room));
    }
  }
}