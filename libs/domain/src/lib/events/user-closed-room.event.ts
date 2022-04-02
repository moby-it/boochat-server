import { RoomEventEnum } from '../room';
import { BaseEvent, RoomId, UserId } from '../common';

export class UserClosedRoomEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(public readonly userId: UserId, public readonly roomId: RoomId, public readonly timestamp: Date) {
    super();
    this.type = RoomEventEnum.USER_CLOSED_ROOM;
    this.createdAt = new Date();
  }
}
