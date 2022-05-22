import { Notification, GoogleId } from '@boochat/domain';
import { Injectable } from '@nestjs/common';
import { ActiveUsersService } from '../users';

@Injectable()
export class DialogNotificationService {
  constructor(private activeUserService: ActiveUsersService) {}
  async send(userId: GoogleId, notification: Notification) {
    await this.activeUserService.notifyUser(userId, notification);
  }
}
