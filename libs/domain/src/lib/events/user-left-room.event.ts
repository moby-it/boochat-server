import { RoomEventEnum } from '../room';
import { BaseEvent, RoomId, UserId } from '../common';

export class UserLeftRoomEvent implements BaseEvent {
  type: number;
  createdAt: Date;
  constructor(public readonly userId: UserId, public readonly roomId: RoomId) {
    this.type = RoomEventEnum.USER_LEFT_ROOM;
    this.createdAt = new Date();
  }
}
