import { RoomDto } from "../rooms/room.dto";

export interface MessageDto {
  sender: string;
  content: string;
  room: RoomDto;

}
