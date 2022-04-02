import { RoomEventEnum } from '../room';
import { BaseEvent, RoomId, UserId } from '../common';

export class UserLeftRoomEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(public readonly userId: UserId, public readonly roomId: RoomId) {
    super();
    this.type = RoomEventEnum.USER_LEFT_ROOM;
    this.createdAt = new Date();
  }
}
