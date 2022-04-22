import { BaseEvent, GoogleId } from '../common';
import { UserEventEnum } from '../user';

export class UserAuthenticatedEvent extends BaseEvent {
  type: number;
  createdAt: Date;

  constructor(
    public readonly userId: GoogleId,
    public readonly imageUrl: string,
    public readonly name: string
  ) {
    super();
    this.type = UserEventEnum.USER_AUTHENTICATED;
    this.createdAt = new Date();
  }
}
