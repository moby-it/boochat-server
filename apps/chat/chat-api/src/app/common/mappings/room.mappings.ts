import { Room } from "@oursocial/domain";
import { MessageDto, RoomDto } from "@oursocial/persistence";
import { MessageDtoToMessage } from "./message.mappings";

export function RoomDtoToRoom(dbRoom: RoomDto, messages: MessageDto[] = []): Room {
  if (!dbRoom.id) throw new Error('cannot convert dbRoom to room with no id');
  const room = Room.create({
    name: dbRoom.name,
    users: dbRoom.userIds.map(userId => ({ id: userId })),
    messages: messages.map(message => MessageDtoToMessage(message)),
    unreadMessages: dbRoom.unreadMessages
  }, dbRoom.id);
  return room;
}
