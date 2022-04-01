import { RoomEventEnum } from '../../chat';
import { BaseEvent, RoomId, UserId } from '../../common';

export class UserClosedRoomEvent implements BaseEvent {
  type: number;
  createdAt: Date;
  constructor(public readonly userId: UserId, public readonly roomId: RoomId, public readonly timestamp: Date) {
    this.type = RoomEventEnum.USER_CLOSED_ROOM;
    this.createdAt = new Date();
  }
}
