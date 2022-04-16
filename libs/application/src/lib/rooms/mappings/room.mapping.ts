import { Message, Room, RoomAnnouncement, RoomItem, RoomItemEnum } from '@boochat/domain';
import { RoomWithItemsDocument, RoomWithLastItemDocument } from '@boochat/persistence/read-db';
import { RoomItemDocument } from '@boochat/persistence/read-db';

function toRoomItem(document: RoomItemDocument): RoomItem {
  if (document.type === RoomItemEnum.Message) {
    return Message.create(
      {
        content: document.content,
        room: { id: document.roomId },
        dateSent: document.createdAt,
        sender: { id: document.senderId }
      },
      document.id
    );
  } else {
    return new RoomAnnouncement({
      content: document.content,
      timestamp: document.createdAt,
      roomId: document.roomId
    });
  }
}

function ToRoomWithLastItem(document: RoomWithLastItemDocument): Room {
  return Room.create(
    {
      name: document.name,
      participants: document.participantIds.map((id) => ({ id })),
      imageUrl: document.imageUrl,
      items: document.lastItem ? [toRoomItem(document.lastItem)] : [],
      hasUnreadMessage: document.isUnread
    },
    document.id
  );
}

export function ToRoomsWithLastItem(documents: RoomWithLastItemDocument[]) {
  return documents.map((document) => ToRoomWithLastItem(document));
}

export function ToRoomWithItems(document: RoomWithItemsDocument): Room {
  return Room.create(
    {
      name: document.name,
      participants: document.participantIds.map((id) => ({ id })),
      imageUrl: document.imageUrl,
      items: document.items.map(toRoomItem),
      hasUnreadMessage: false
    },
    document.id
  );
}
