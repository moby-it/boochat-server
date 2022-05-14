import { GoogleId, Notification, RegistrationToken } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { transformToPlain } from '../common';
@Injectable()
export class PushNotificationService {
  private userIdRegistrationTokenMap: Map<GoogleId, Set<RegistrationToken>> = new Map();
  constructor(private roomRepository: RoomsRepository) {}
  async notify(notification: Notification, topic: string) {
    await firebase.messaging().send({
      data: notification.toFirebaseNotification(),
      notification: {
        title: notification.title,
        body: notification.message
      },
      topic
    });
  }
  async subscribeUsersToTopic(userIds: GoogleId[], topic: string) {
    const registrationTokens = userIds
      .map((userId) => this.userIdRegistrationTokenMap.get(userId) || new Set<string>())
      .flatMap((tokensSet: Set<string>) => Array.from(tokensSet))
      .flat();

    await this.subscribeToTopic(registrationTokens, topic);
  }
  async addSubscription(userId: GoogleId, registrationToken: RegistrationToken) {
    const hasAlreadySubscribed = this.userIdRegistrationTokenMap.get(userId)?.has(registrationToken);
    if (!hasAlreadySubscribed) {
      const userRooms = await this.roomRepository.getRoomsByUserId(userId);
      if (this.userIdRegistrationTokenMap.has(userId)) {
        this.userIdRegistrationTokenMap.get(userId)?.add(registrationToken);
      } else {
        this.userIdRegistrationTokenMap.set(userId, new Set([registrationToken]));
      }
      for (const room of userRooms) {
        await this.subscribeToTopic([registrationToken], room.id);
      }
      console.log('room for new subscribed user are', userRooms.map((r) => r.id).toString());
      const roomIds = userRooms
        .map((room) => room.id)
        .reduce<string>((accumulator: string, value) => {
          accumulator += ', ' + value;
          return accumulator;
        }, '');

      console.log(`RegistrationToken: ${registrationToken} for user ${userId} subscribed to ${roomIds}`);
    }
  }
  async subscribeToTopics(userId: GoogleId, topics: string[]) {
    const registrationTokens = this.getRegistrationTokensForUserId([userId]);
    for (const topic of topics) {
      await this.subscribeToTopic(registrationTokens, topic);
    }
  }
  async unsubscribeFromTopics(userId: GoogleId, topics: string[]) {
    const registrationTokens = this.getRegistrationTokensForUserId([userId]);
    for (const topic of topics) {
      await this.unsubscribeFromTopic(registrationTokens, topic);
    }
  }
  private getRegistrationTokensForUserId(userIds: GoogleId[]): string[] {
    const registrationTokens = userIds
      .map((userId) => this.userIdRegistrationTokenMap.get(userId) || new Set<string>())
      .flatMap((tokensSet: Set<string>) => Array.from(tokensSet))
      .flat();
    return registrationTokens;
  }
  private async subscribeToTopic(registrationTokens: string[], topic: string) {
    console.log('Subscribed to topic', topic);
    await firebase.messaging().subscribeToTopic(registrationTokens, `/topics/${topic}`);
  }
  private async unsubscribeFromTopic(registrationTokens: string[], topic: string) {
    console.log('unsubscribed to topic', topic);

    await firebase.messaging().unsubscribeFromTopic(registrationTokens, `/topics/${topic}`);
  }
}
