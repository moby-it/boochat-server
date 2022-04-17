import { Notification, UserId } from '@boochat/domain';
import { Injectable } from '@nestjs/common';
import { ActiveUsersService } from '../users';

@Injectable()
export class NotificationService {
  constructor(private activeUserService: ActiveUsersService) {}
  async send(userId: UserId, notification: Notification) {
    this.activeUserService.notifyUser(userId, notification);
  }
}
