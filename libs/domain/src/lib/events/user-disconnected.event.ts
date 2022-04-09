import { ApplicationEventEnum } from '../application-events.type';
import { BaseEvent, UserId } from '../common';

export class UserDisconnectedEvent extends BaseEvent {
  type: number;
  createdAt: Date;
  constructor(public readonly userId: UserId) {
    super();
    this.type = ApplicationEventEnum.USER_DISCONNECTED;
    this.createdAt = new Date();
  }
}
