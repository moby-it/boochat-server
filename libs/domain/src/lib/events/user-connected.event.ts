import { BaseEvent } from '../common';
import { ApplicationEventEnum } from '../application-events.type';
import { User } from '../user';

export class UserConnectedEvent extends BaseEvent {
  type: number;
  userId: string;
  createdAt: Date;
  constructor(public readonly user: User) {
    super();
    this.type = ApplicationEventEnum.USER_CONNECTED;
    this.userId = user.id;
    this.createdAt = new Date();
  }
}
