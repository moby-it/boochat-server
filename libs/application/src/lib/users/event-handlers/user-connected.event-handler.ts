import { UserConnectedEvent } from '@boochat/domain';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus/event-bus.service';

@EventsHandler(UserConnectedEvent)
export class UserConnectedEventHandler implements IEventHandler<UserConnectedEvent> {
  constructor(private eventBus: EventBusService) {}
  async handle(event: UserConnectedEvent): Promise<void> {
    await this.eventBus.emitApplicationEvent(event);
  }
}
