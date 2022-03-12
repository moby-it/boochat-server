import { RoomDto } from "../rooms/room.dto";

export interface MessageDto {
  sender: string;
  content: string;
  room: RoomDto;

}
export function shouldCreateRoom(message: MessageDto): boolean {
  return !message.room.id;
}
