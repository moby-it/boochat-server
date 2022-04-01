import { UserDisconnectedEvent } from '@boochat/domain';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus/event-bus.service';

@EventsHandler(UserDisconnectedEvent)
export class UserDisconnectedEventHandler implements IEventHandler<UserDisconnectedEvent> {
  constructor(private eventBus: EventBusService) {}
  async handle(event: UserDisconnectedEvent): Promise<void> {
    await this.eventBus.emitApplicationEvent(event);
  }
}
