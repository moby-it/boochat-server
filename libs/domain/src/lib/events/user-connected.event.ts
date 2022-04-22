import { IEvent } from '@nestjs/cqrs';
import { Socket } from 'socket.io';
import { GoogleId } from '../common';

export class UserConnectedEvent implements IEvent {
  constructor(public readonly userId: GoogleId, public readonly socket: Socket) {}
}
