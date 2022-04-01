import { RoomEventEnum } from '../../chat';
import { BaseEvent, RoomId, UserId } from '../../common';

export class LeaveRoomEvent implements BaseEvent {
  type: number;
  createdAt: Date;
  constructor(public readonly userId: UserId, public readonly roomId: RoomId) {
    this.type = RoomEventEnum.USER_LEFT_ROOM;
    this.createdAt = new Date();
  }
}
