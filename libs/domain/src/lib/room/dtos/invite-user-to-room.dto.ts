import { RoomId, UserId } from '../../common';

export interface InviteUserToRoomDto {
  userId: UserId;
  inviteeId: UserId;
  roomId: RoomId;
}
