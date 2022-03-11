import { RoomDto } from "../rooms/room.dto";

export class MessageDto {
  sender!: string;
  content!: string;
  room!: RoomDto;

  belongsOnANewRoom(): boolean {
    return !this.room.id;
  }
}
