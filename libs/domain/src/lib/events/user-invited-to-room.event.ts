import { RoomEventEnum } from '../room';
import { BaseEvent, RoomId, GoogleId } from '../common';

export class UserInvitedToRoomEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(
    public readonly userId: GoogleId,
    public readonly inviteeId: GoogleId,
    public readonly roomId: RoomId
  ) {
    super();
    this.type = RoomEventEnum.USER_INVITED_ROOM;
    this.createdAt = new Date();
  }
}
