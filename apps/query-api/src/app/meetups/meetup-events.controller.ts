import {
  MeetupEventEnum,
  PollClosedEvent,
  UserCastPollVoteEvent,
  UserChangedRoomImageEvent,
  UserChangedRsvpEvent,
  UserCreatedMeetupEvent,
  UserCreatedPollEvent
} from '@boochat/domain';
import { Controller } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { EventPattern } from '@nestjs/microservices';
import { instanceToInstance } from 'class-transformer';

@Controller()
export class MeetupEventsController {
  constructor(private eventBus: EventBus) {}
  @EventPattern(MeetupEventEnum[MeetupEventEnum.MEETUP_CREATED])
  async meetupCreated(event: UserCreatedMeetupEvent) {
    await this.eventBus.publish(instanceToInstance<UserCreatedMeetupEvent>(event));
  }
  @EventPattern(MeetupEventEnum[MeetupEventEnum.POLL_CLOSED])
  async pollClosed(event: PollClosedEvent) {
    await this.eventBus.publish(instanceToInstance<PollClosedEvent>(event));
  }
  @EventPattern(MeetupEventEnum[MeetupEventEnum.USER_CHANGED_ROOM_IMAGE])
  async changedRoomImage(event: UserChangedRoomImageEvent) {
    await this.eventBus.publish(instanceToInstance<UserChangedRoomImageEvent>(event));
  }
  @EventPattern(MeetupEventEnum[MeetupEventEnum.USER_CHANGED_RSVP])
  async changedRsvp(event: UserChangedRsvpEvent) {
    await this.eventBus.publish(instanceToInstance<UserChangedRsvpEvent>(event));
  }
  @EventPattern(MeetupEventEnum[MeetupEventEnum.USER_CREATED_POLL])
  async createdPoll(event: UserCreatedPollEvent) {
    await this.eventBus.publish(instanceToInstance<UserCreatedPollEvent>(event));
  }
  @EventPattern(MeetupEventEnum[MeetupEventEnum.USER_VOTED_ON_POLL])
  async voteOnPoll(event: UserCastPollVoteEvent) {
    await this.eventBus.publish(instanceToInstance<UserCastPollVoteEvent>(event));
  }
}
