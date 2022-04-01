import { IEvent } from '@nestjs/cqrs';
import { Socket } from 'socket.io';
import { User } from '../user';

export class UserConnectedEvent implements IEvent {
  constructor(public readonly user: User, public readonly socket: Socket) {}
}
