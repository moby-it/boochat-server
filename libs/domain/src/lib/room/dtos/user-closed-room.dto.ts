import { RoomId, UserId } from '../../common';

export interface UserClosedRoomDto {
  userId: UserId;
  roomId: RoomId;
}
