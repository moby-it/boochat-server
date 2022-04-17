import { RoomId, UserId } from '../../common';

export interface InviteUserToRoomDto {
  inviteeId: UserId;
  roomId: RoomId;
}
