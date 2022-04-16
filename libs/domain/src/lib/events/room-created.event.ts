import { BaseEvent } from '../common';
import { RoomEventEnum } from '../room';

export class RoomCreatedEvent extends BaseEvent {
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
