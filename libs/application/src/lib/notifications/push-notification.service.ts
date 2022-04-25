import { GoogleId, RoomItem } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as webpush from 'web-push';
import { PushSubscription } from 'web-push';
import { transformToPlain } from '../common';
import { ActiveUsersService } from '../users';
import { Notification } from '@boochat/domain';
@Injectable()
export class PushNotificationService {
  private userSubscriptions: Map<GoogleId, PushSubscription[]> = new Map();

  constructor(
    private roomRepository: RoomsRepository,
    private activeUserService: ActiveUsersService,
    private config: ConfigService
  ) {}
  private setVapidDetails() {
    const publicKey = this.config.get<string>('PUBLIC_VAPID_KEY');
    const privateKey = this.config.get<string>('PRIVATE_VAPID_KEY');
    if (!publicKey || !privateKey) throw new Error('invalid vapid config');
    webpush.setVapidDetails('mailto:gespa11019@gmail.com', publicKey, privateKey);
  }
  async messageSent(roomItem: RoomItem) {
    const room = await this.roomRepository.getRoom(roomItem.roomId);
    const participantIds = room.participantIds;
    const offlineParticipantIds = participantIds.filter(
      (id) => !this.activeUserService.activeUserIds.includes(id) || true
    );
    offlineParticipantIds.forEach((userId) => {
      const subs = this.findUserSubscriptions(userId);
      subs.forEach(async (sub) => {
        this.setVapidDetails();
        const notification = Notification.createInfo(`New message`, roomItem.content);
        const payload = JSON.stringify(transformToPlain(notification));
        webpush.sendNotification(sub, payload);
      });
    });
  }
  private findUserSubscriptions(googleId: GoogleId): PushSubscription[] {
    return this.userSubscriptions.get(googleId) || [];
  }
  addSubscription(googleId: GoogleId, subscription: PushSubscription) {
    const existingSubs = this.userSubscriptions.get(googleId) || [];
    this.userSubscriptions.set(googleId, [subscription, ...existingSubs]);
    console.log('subscription added');
  }
}
