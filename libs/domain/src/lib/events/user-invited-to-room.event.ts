import { RoomEventEnum } from '../room';
import { BaseEvent, RoomId, UserId } from '../common';

export class UserInvitedToRoomEvent implements BaseEvent {
  type: number;
  createdAt: Date;
  constructor(public readonly userId: UserId, public readonly inviteeId: UserId, public readonly roomId: RoomId) {
    this.type = RoomEventEnum.USER_INVITED_ROOM;
    this.createdAt = new Date();
  }
}