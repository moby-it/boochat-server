import { Room } from "@oursocial/domain";
import { MessageDocument, PopulatedRoomDocument, RoomDocument } from "@oursocial/persistence";
import { dbMessageDocumentToMessage } from "./message.mappings";

export function dbRoomToRoom(dbRoom: RoomDocument, messages: MessageDocument[]): Room {
  const room = Room.create({
    name: dbRoom.name,
    users: dbRoom.users.map(user => ({ id: user.userId.toString() })),
    messages: messages.map(message => dbMessageDocumentToMessage(message))
  }, dbRoom.id);
  return room;
}
