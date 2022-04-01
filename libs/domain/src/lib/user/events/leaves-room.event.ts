import { IEvent } from '@nestjs/cqrs';
import { RoomId, UserId } from '../../common';

export class LeaveRoomEvent implements IEvent {
  constructor(public readonly roomId: RoomId, public readonly userId: UserId) {}
}
