import { ApplicationEventEnum } from '../application-events.type';
import { BaseEvent } from '../common';
import { User } from '../user';

export class UserConnectedEvent implements BaseEvent {
  type: number;
  userId: string;
  createdAt: Date;
  constructor(public readonly user: User) {
    this.type = ApplicationEventEnum.USER_CONNECTED;
    this.userId = user.id;
    this.createdAt = new Date();
  }
}
