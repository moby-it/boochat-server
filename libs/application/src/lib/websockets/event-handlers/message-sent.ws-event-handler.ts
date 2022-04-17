import { AnnouncementCreatedEvent, Message, MessageSentEvent, RoomAnnouncement } from '@boochat/domain';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { transformToPlain, WebsocketEventsEnum, WsServer } from '../../common';

@EventsHandler(MessageSentEvent, AnnouncementCreatedEvent)
export class RoomItemSentWsEventHandler
  implements IEventHandler<MessageSentEvent | AnnouncementCreatedEvent>
{
  async handle(event: MessageSentEvent | AnnouncementCreatedEvent) {
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
      WsServer.emitToRoom(event.roomId, WebsocketEventsEnum.NEW_ROOM_ITEM, transformToPlain(message));
    } else {
      const { content, createdAt, roomId } = event;
      const announcement = new RoomAnnouncement({
        content,
        timestamp: createdAt,
        roomId
      });
      WsServer.emitToRoom(event.roomId, WebsocketEventsEnum.NEW_ROOM_ITEM, transformToPlain(announcement));
    }
  }
}
