import { ApplicationEventEnum } from '../application-events.type';
import { BaseEvent } from '../common';
import { User } from '../user';

export class UserDisconnectedEvent extends BaseEvent {
  type: number;
  userId: string;
  createdAt: Date;
  constructor(public readonly user: User) {
    super();
    this.type = ApplicationEventEnum.USER_DISCONNECTED;
    this.userId = user.id;
    this.createdAt = new Date();
  }
}
