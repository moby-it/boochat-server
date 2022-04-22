import { RoomId, GoogleId } from '../../common';

export interface InviteUserToRoomDto {
  inviteeId: GoogleId;
  roomId: RoomId;
}
