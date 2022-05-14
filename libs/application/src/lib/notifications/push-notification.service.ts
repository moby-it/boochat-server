import { GoogleId, Notification, RegistrationToken } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { Injectable } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { transformToPlain } from '../common';
@Injectable()
export class PushNotificationService {
  private userIdRegistrationTokenMap: Map<GoogleId, Set<RegistrationToken>> = new Map();
  constructor(private roomRepository: RoomsRepository) {}
  async notify(payload: Notification, topic: string) {
    await firebase.messaging().sendToTopic(topic, {
      data: transformToPlain(payload),
      notification: {
        title: payload.title,
        body: payload.message,
        sound: 'notification'
      }
    });
  }
  async subscribeUsersToTopic(userIds: GoogleId[], topic: string) {
    const registrationTokens = userIds
      .map((userId) => this.userIdRegistrationTokenMap.get(userId) || new Set<string>())
      .flatMap((tokensSet: Set<string>) => Array.from(tokensSet))
      .flat();

    await firebase.messaging().subscribeToTopic(registrationTokens, topic);
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
        await firebase.messaging().subscribeToTopic(registrationToken, room.id);
      }
    }
  }
  async subscribeToTopics(userId: GoogleId, topics: string[]) {
    const registrationTokens = this.getRegistrationTokensForUserId([userId]);
    for (const topic of topics) {
      await firebase.messaging().subscribeToTopic(registrationTokens, topic);
    }
  }
  async unsubscribeFromTopics(userId: GoogleId, topics: string[]) {
    const registrationTokens = this.getRegistrationTokensForUserId([userId]);
    for (const topic of topics) {
      await firebase.messaging().unsubscribeFromTopic(registrationTokens, topic);
    }
  }
  private getRegistrationTokensForUserId(userIds: GoogleId[]): string[] {
    const registrationTokens = userIds
      .map((userId) => this.userIdRegistrationTokenMap.get(userId) || new Set<string>())
      .flatMap((tokensSet: Set<string>) => Array.from(tokensSet))
      .flat();
    return registrationTokens;
  }
}
