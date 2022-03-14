import { Room } from "@oursocial/domain";
import { DbMessage, DbRoom } from "@oursocial/persistence";
import { dbMessageDocumentToMessage } from "./message.mappings";

export function dbRoomToRoom(dbRoom: DbRoom, messages: DbMessage[]): Room {
  const room = Room.create({
    name: dbRoom.name,
    users: dbRoom.users.map(userId => ({ id: userId.toString() })),
    messages: messages.map(message => dbMessageDocumentToMessage(message))
  }, dbRoom.id);
  return room;
}
