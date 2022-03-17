import { MessageDto } from "./message.dto";

export function shouldCreateRoom(message: MessageDto): boolean {
  return !message.room.id;
}
