import { GoogleId, Notification, RegistrationToken } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { Injectable, NotImplementedException } from '@nestjs/common';
import * as firebase from 'firebase-admin';
@Injectable()
export class PushNotificationService {
  private userIdRegistrationTokenMap: Map<GoogleId, RegistrationToken> = new Map();
  constructor(private roomRepository: RoomsRepository) {}
  async notifyRoom(notification: Notification, roomId: string) {
    const room = await this.roomRepository.getRoom(roomId);
    console.log(`new notification in ${room.name}`);
    await firebase.messaging().send({
      data: notification.toFirebaseNotification(),
      notification: {
        title: room.name,
        body: notification.message
      },
      android: {
        collapseKey: room._id,
        notification: {
          sound: 'notification'
        }
      },
      topic: room._id
    });
  }
  async notifyMeetup(notification: Notification, meetupId: string) {
    throw new NotImplementedException();
  }
  async subscribeUsersToTopic(userIds: GoogleId[], topic: string) {
    const registrationTokens = userIds
      .map((userId) => this.userIdRegistrationTokenMap.get(userId))
      .filter((v) => !!v) as string[];
    if (registrationTokens.length) {
      await this.subscribeToTopic(registrationTokens, topic);
    }
  }
  async addSubscription(userId: GoogleId, registrationToken: RegistrationToken) {
    const userRooms = await this.roomRepository.getRoomsByUserId(userId);
    this.userIdRegistrationTokenMap.set(userId, registrationToken);
    for (const room of userRooms) {
      await this.subscribeToTopic([registrationToken], room._id);
    }
    console.log('room for new subscribed user are', userRooms.map((r) => r._id).toString());
    const roomIds = userRooms
      .map((room) => room._id)
      .reduce<string>((accumulator: string, value) => {
        accumulator += ', ' + value;
        return accumulator;
      }, '');

    console.log(`RegistrationToken: ${registrationToken} for user ${userId} subscribed to ${roomIds}`);
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
      .map((userId) => this.userIdRegistrationTokenMap.get(userId))
      .filter((v) => !!v) as string[];

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
