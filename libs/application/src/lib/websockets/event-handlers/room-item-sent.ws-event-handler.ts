import {
  AnnouncementCreatedEvent,
  Message,
  MessageSentEvent,
  Notification,
  RoomAnnouncement,
  RoomItem
} from '@boochat/domain';
import { QuerySocketEventsEnum } from '@boochat/shared';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { transformToPlain, WsServer } from '../../common';
import { PushNotificationService } from '../../notifications';

@EventsHandler(MessageSentEvent, AnnouncementCreatedEvent)
export class RoomItemSentWsEventHandler
  implements IEventHandler<MessageSentEvent | AnnouncementCreatedEvent>
{
  constructor(private pushNotification: PushNotificationService) {}
  async handle(event: MessageSentEvent | AnnouncementCreatedEvent) {
    let roomItem: RoomItem;
    if (event instanceof MessageSentEvent) {
      const { content, createdAt, senderId, roomId } = event;
      const message = Message.create(
        {
          content,
          dateSent: createdAt,
          room: { id: roomId },
          sender: { id: senderId }
        },
        event.id
      );
      roomItem = message;
    } else {
      const { content, createdAt, roomId } = event;
      const announcement = new RoomAnnouncement({
        id: event.id,
        content,
        timestamp: createdAt,
        roomId
      });
      roomItem = announcement;
    }
    WsServer.emitToRoom(event.roomId, QuerySocketEventsEnum.NEW_ROOM_ITEM, transformToPlain(roomItem));
    const notification = Notification.createInfo(roomItem.roomId, roomItem.content);
    await this.pushNotification.notifyRoom(notification, roomItem.roomId);
  }
}
