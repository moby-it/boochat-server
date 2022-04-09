import { UserCastPollVoteEvent } from '@boochat/domain';
import { MeetupEventStoreService } from '@boochat/persistence/events-store';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus/event-bus.service';

@EventsHandler(UserCastPollVoteEvent)
export class UserCastVoteOnPollEventHandler implements IEventHandler<UserCastPollVoteEvent> {
  constructor(private meetupStore: MeetupEventStoreService, private eventBus: EventBusService) {}
  async handle(event: UserCastPollVoteEvent) {
    await this.meetupStore.create(event);
    await this.eventBus.emitMeetupEvent(event);
  }
}
