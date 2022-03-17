import { RoomId } from "@oursocial/domain";

export interface RoomDto {
  id?: RoomId;
  name: string;
  userIds: string[];
}
export interface LastRoomVisitDto {
  roomId: string;
  userId: string;
  timestamp: Date;
}
