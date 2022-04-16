import {
  AnnouncementCreatedEvent,
  MessageSentEvent,
  RoomCreatedEvent,
  RoomEventEnum,
  UserClosedRoomEvent,
  UserInvitedToRoomEvent,
  UserLeftRoomEvent
} from '@boochat/domain';
import { Controller } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';

@Controller()
export class RoomEventsController {
  constructor(private eventBus: EventBus) {}
  @EventPattern(RoomEventEnum[RoomEventEnum.ROOM_CREATED])
  async createRoom(event: RoomCreatedEvent) {
    await this.eventBus.publish(plainToInstance(RoomCreatedEvent, event));
  }
  @EventPattern(RoomEventEnum[RoomEventEnum.USER_SENT_MESSAGE])
  async sendMessage(event: MessageSentEvent) {
    await this.eventBus.publish(plainToInstance(MessageSentEvent, event));
  }
  @EventPattern(RoomEventEnum[RoomEventEnum.ANNOUNCEMENT_CREATED])
  async annoucementCreated(event: AnnouncementCreatedEvent) {
    await this.eventBus.publish(plainToInstance(AnnouncementCreatedEvent, event));
  }
  @EventPattern(RoomEventEnum[RoomEventEnum.USER_CLOSED_ROOM])
  async userClosedRoom(event: UserClosedRoomEvent) {
    await this.eventBus.publish(plainToInstance(UserClosedRoomEvent, event));
  }
  @EventPattern(RoomEventEnum[RoomEventEnum.USER_INVITED_ROOM])
  async userInvitedToRoom(event: UserInvitedToRoomEvent) {
    await this.eventBus.publish(plainToInstance(UserInvitedToRoomEvent, event));
  }
  @EventPattern(RoomEventEnum[RoomEventEnum.USER_LEFT_ROOM])
  async userLeftRoom(event: UserLeftRoomEvent) {
    await this.eventBus.publish(plainToInstance(UserLeftRoomEvent, event));
  }
}
