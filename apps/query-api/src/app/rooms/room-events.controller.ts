import {
  RoomEventEnum,
  UserClosedRoomEvent,
  UserCreatedRoomEvent,
  UserInvitedToRoomEvent,
  UserLeftRoomEvent,
  UserSentMessageEvent
} from '@boochat/domain';
import { Controller } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices';
import { instanceToInstance } from 'class-transformer';

@Controller()
export class RoomEventsController {
  constructor(private eventBus: EventBus) {}
  @EventPattern(RoomEventEnum[RoomEventEnum.ROOM_CREATED])
  async createRoom(event: UserCreatedRoomEvent) {
    await this.eventBus.publish(instanceToInstance<UserCreatedRoomEvent>(event));
  }
  @EventPattern(RoomEventEnum[RoomEventEnum.USER_SENT_MESSAGE])
  async sendMessage(event: UserSentMessageEvent) {
    await this.eventBus.publish(instanceToInstance<UserSentMessageEvent>(event));
  }
  @EventPattern(RoomEventEnum[RoomEventEnum.USER_CLOSED_ROOM])
  async userClosedRoom(event: UserClosedRoomEvent) {
    await this.eventBus.publish(instanceToInstance<UserClosedRoomEvent>(event));
  }
  @EventPattern(RoomEventEnum[RoomEventEnum.USER_INVITED_ROOM])
  async userInvitedToRoom(event: UserInvitedToRoomEvent) {
    await this.eventBus.publish(instanceToInstance<UserInvitedToRoomEvent>(event));
  }
  @EventPattern(RoomEventEnum[RoomEventEnum.USER_LEFT_ROOM])
  async userLeftRoom(event: UserLeftRoomEvent) {
    await this.eventBus.publish(instanceToInstance<UserLeftRoomEvent>(event));
  }
}
