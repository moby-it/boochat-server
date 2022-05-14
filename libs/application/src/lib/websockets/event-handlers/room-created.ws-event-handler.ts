import { Room, RoomCreatedEvent } from '@boochat/domain';
import { QuerySocketEventsEnum } from '@boochat/shared';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { transformToPlain, WsServer } from '../../common';
import { PushNotificationService } from '../../notifications';
import { ActiveUsersService } from '../../users';

@EventsHandler(RoomCreatedEvent)
export class RoomCreatedWsEventHandler implements IEventHandler<RoomCreatedEvent> {
  constructor(
    private activeUserService: ActiveUsersService,
    private pushNotificationService: PushNotificationService
  ) {}
  async handle(event: RoomCreatedEvent) {
    for (const userId of event.userIds) {
      await this.activeUserService.connectUserToRoom(userId, event.id);
    }
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
    WsServer.emitToRoom(event.id, QuerySocketEventsEnum.ROOM_CREATED, transformToPlain(room));
    await this.pushNotificationService.subscribeUsersToTopic(event.userIds, room.id);
  }
}
