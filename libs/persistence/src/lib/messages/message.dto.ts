import { RoomDto } from "../rooms/room.dto";

export class MessageDto {
  sender: string;
  content: string;
  timestamp: string;
  room: RoomDto;
}
