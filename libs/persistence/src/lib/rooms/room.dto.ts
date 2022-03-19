import { RoomId } from "@oursocial/domain";
import { MessageDto } from "../messages";

export interface RoomDto {
  id?: RoomId;
  name: string;
  userIds: string[];
  unreadMessages?: number;

}
export interface CreateRoomDto extends RoomDto { }
export interface LastRoomVisitDto {
  roomId: string;
  userId: string;
  timestamp: Date;
}
export interface RoomByUserIdDto extends RoomDto {
  id: string;
  lastMessage: MessageDto;
  unreadMessages: number;
}
