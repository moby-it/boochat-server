import { UserCreatedPollEvent } from '@boochat/domain';
import { MeetupEventStoreService } from '@boochat/persistence';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus/event-bus.service';

@EventsHandler(UserCreatedPollEvent)
export class UserCreatedPollEventHandler implements IEventHandler<UserCreatedPollEvent> {
  constructor(private meetupStore: MeetupEventStoreService, private eventBus: EventBusService) {}
  async handle(event: UserCreatedPollEvent) {
    await this.meetupStore.create(event);
    await this.eventBus.emitMeetupEvent(event);
  }
}
