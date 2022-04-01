import { IEvent } from '@nestjs/cqrs';
import { User } from '../user';

export class UserDisconnectedEvent implements IEvent {
  constructor(public readonly user: User) {}
}
