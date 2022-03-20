import { MessageDto, MessageWithRoomDto } from "./message.dto";

export function shouldCreateRoom(message: MessageDto): message is MessageWithRoomDto {
  return !message.roomId;
}
