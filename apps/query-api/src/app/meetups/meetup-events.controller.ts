import {
  MeetupCreatedEvent,
  MeetupEventEnum,
  PollClosedEvent,
  PollCreatedEvent,
  PollVoteEvent,
  RoomImageChangedEvent,
  RsvpChangedEvent
} from '@boochat/domain';
import { Controller } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices';
import { plainToInstance } from 'class-transformer';

@Controller()
export class MeetupEventsController {
  constructor(private eventBus: EventBus) {}
  @EventPattern(MeetupEventEnum[MeetupEventEnum.MEETUP_CREATED])
  async meetupCreated(event: MeetupCreatedEvent) {
    await this.eventBus.publish(plainToInstance(MeetupCreatedEvent, event));
  }
  @EventPattern(MeetupEventEnum[MeetupEventEnum.POLL_CLOSED])
  async pollClosed(event: PollClosedEvent) {
    await this.eventBus.publish(plainToInstance(PollClosedEvent, event));
  }
  @EventPattern(MeetupEventEnum[MeetupEventEnum.USER_CHANGED_ROOM_IMAGE])
  async changedRoomImage(event: RoomImageChangedEvent) {
    await this.eventBus.publish(plainToInstance(RoomImageChangedEvent, event));
  }
  @EventPattern(MeetupEventEnum[MeetupEventEnum.USER_CHANGED_RSVP])
  async changedRsvp(event: RsvpChangedEvent) {
    await this.eventBus.publish(plainToInstance(RsvpChangedEvent, event));
  }
  @EventPattern(MeetupEventEnum[MeetupEventEnum.USER_CREATED_POLL])
  async createdPoll(event: PollCreatedEvent) {
    await this.eventBus.publish(plainToInstance(PollCreatedEvent, event));
  }
  @EventPattern(MeetupEventEnum[MeetupEventEnum.USER_VOTED_ON_POLL])
  async voteOnPoll(event: PollVoteEvent) {
    await this.eventBus.publish(plainToInstance(PollVoteEvent, event));
  }
}
