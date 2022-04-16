import { IEvent } from '@nestjs/cqrs';
import { Socket } from 'socket.io';
import { UserId } from '../common';

export class UserConnectedEvent implements IEvent {
  constructor(public readonly userId: UserId, public readonly socket: Socket) {}
}
