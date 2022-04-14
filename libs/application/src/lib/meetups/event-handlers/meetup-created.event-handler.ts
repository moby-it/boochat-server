import { UserCreatedMeetupEvent } from '@boochat/domain';
import { MeetupEventStoreService } from '@boochat/persistence/events-store';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus/event-bus.service';

@EventsHandler(UserCreatedMeetupEvent)
export class MeetupCreatedEventHandler implements IEventHandler<UserCreatedMeetupEvent> {
  constructor(private meetupStore: MeetupEventStoreService, private eventBus: EventBusService) {}
  async handle(event: UserCreatedMeetupEvent) {
    await this.meetupStore.save(event);
    await this.eventBus.emitMeetupEvent(event);
  }
}
