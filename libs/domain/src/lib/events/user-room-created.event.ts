import { RoomEventEnum } from '../room';
import { BaseEvent } from '../common';

export class UserCreatedRoomEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(
    public userId: string,
    public readonly roomName: string,
    public readonly imageUrl: string,
    public readonly userIds: string[]
  ) {
    super();
    this.type = RoomEventEnum.ROOM_CREATED;
    this.createdAt = new Date();
  }
}
