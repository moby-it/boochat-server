import { Room } from '@boochat/domain';
import { RoomWithItemsDocument, RoomWithLastItemDocument } from '@boochat/persistence/read-db';

function fromDocumentToRoomWithLastItem(document: RoomWithLastItemDocument): Room {}

export function fromDocumentToRoomsWithLastItem(documents: RoomWithLastItemDocument[]) {
  return documents.map((document) => fromDocumentToRoomWithLastItem(document));
}

export function fromDocumentToRoomWithItems(document: RoomWithItemsDocument): Room {}
