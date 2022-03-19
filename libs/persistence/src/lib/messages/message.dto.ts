import { RoomDto } from "../rooms";

export interface MessageDto {
  id?: string;
  senderId: string;
  content: string;
  roomId: string;
  createdAt: Date;
}
export interface MessageWithRoomDto extends MessageDto {
  room: RoomDto;
}
