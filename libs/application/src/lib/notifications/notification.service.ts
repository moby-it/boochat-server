import { Notification, GoogleId } from '@boochat/domain';
import { Injectable } from '@nestjs/common';
import { ActiveUsersService } from '../users';

@Injectable()
export class NotificationService {
  constructor(private activeUserService: ActiveUsersService) {}
  async send(userId: GoogleId, notification: Notification) {
    this.activeUserService.notifyUser(userId, notification);
  }
}
