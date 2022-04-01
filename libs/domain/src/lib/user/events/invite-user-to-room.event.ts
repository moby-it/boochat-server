import { IEvent } from '@nestjs/cqrs';
import { RoomId, UserId } from '../../common';

export class InviteUserToRoomEvent implements IEvent {
  constructor(public readonly userId: UserId, public readonly roomId: RoomId) {}
}
