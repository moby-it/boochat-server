import { RoomDto } from "../rooms";
import { UserDto } from "../users";

export interface MessageDto {
  id?: string;
  senderId: string;
  content: string;
  roomId: string;
  createdAt: Date;
}
export interface CreateMessageDto extends MessageDto {

}
export interface MessageWithRoomDto extends MessageDto {
  room: RoomDto;
}
export interface PopulatedMessageDto extends MessageDto {
  id: string;
  sender: UserDto,
  room: RoomDto;
}
