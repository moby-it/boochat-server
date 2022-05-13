import { GoogleId } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ActiveUsersService } from '../users';
@Injectable()
export class PushNotificationService {
  private userSubscriptions: Map<GoogleId, PushSubscription[]> = new Map();
  private navigateUrl = this.config.get<string>('CLIENT_URL');
  constructor(
    private roomRepository: RoomsRepository,
    private activeUserService: ActiveUsersService,
    private config: ConfigService
  ) {}
  private findUserSubscriptions(googleId: GoogleId): PushSubscription[] {
    return this.userSubscriptions.get(googleId) || [];
  }
  addSubscription(googleId: GoogleId, subscription: PushSubscription) {
    const existingSubs = this.userSubscriptions.get(googleId) || [];
    this.userSubscriptions.set(googleId, [subscription, ...existingSubs]);
    console.log('subscription added');
  }
  removeSubscriptions(googleId: GoogleId) {
    this.userSubscriptions.delete(googleId);
  }
}
