import { ApplicationEventEnum } from '../application-events.type';
import { BaseEvent, UserId } from '../common';

export class UserConnectedEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(public readonly userId: UserId) {
    super();
    this.type = ApplicationEventEnum.USER_CONNECTED;
    this.createdAt = new Date();
  }
}
