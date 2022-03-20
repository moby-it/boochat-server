import { RoomId } from "@oursocial/domain";
import { MessageDto } from "../messages";

export interface RoomDto {
  id?: RoomId;
  name: string;
  userIds: string[];
  unreadMessages?: number;

}
export interface CreateRoomDto extends RoomDto { }
export interface CreatedRoomDto extends RoomDto {
  id: RoomId;
}
export interface LastRoomVisitDto {
  roomId: string;
  userId: string;
}
export interface RoomByUserIdDto extends RoomDto {
  id: string;
  lastMessage: MessageDto;
  unreadMessages: number;
}
