import { User } from "../users/user.schema";
import { Room } from "../rooms";
import { RoomDto } from "../rooms/room.dto";
import { Message } from "./message.schema";

export interface MessageDto {
  sender: string;
  content: string;
  room: RoomDto;

}
export interface PopulatedMessage extends Omit<Message, 'sender' | 'room'> {
  sender: User,
  room: Room;
}
