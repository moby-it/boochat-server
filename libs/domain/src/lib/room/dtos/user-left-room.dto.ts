import { RoomId, UserId } from '../../common';

export interface UserLeftRoomDto {
  userId: UserId;
  roomId: RoomId;
}
