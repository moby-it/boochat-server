import { RoomEventEnum } from '../room';
import { BaseEvent } from '../common';

export class CreateRoomEvent implements BaseEvent {
  type: number;
  createdAt: Date;
  constructor(public userId: string, public readonly roomName: string, public readonly userIds: string[]) {
    this.type = RoomEventEnum.ROOM_CREATED;
    this.createdAt = new Date();
  }
}
