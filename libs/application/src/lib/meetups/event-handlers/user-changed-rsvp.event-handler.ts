import { UserChangedRsvpEvent } from '@boochat/domain';
import { MeetupEventStoreService } from '@boochat/persistence';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus/event-bus.service';

@EventsHandler(UserChangedRsvpEvent)
export class UserChangedRsvpEventHandler implements IEventHandler<UserChangedRsvpEvent> {
  constructor(private meetupStore: MeetupEventStoreService, private eventBus: EventBusService) {}
  async handle(event: UserChangedRsvpEvent) {
    await this.meetupStore.create(event);
    await this.eventBus.emitMeetupEvent(event);
  }
}
