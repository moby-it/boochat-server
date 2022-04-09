import { UserSentMessageEvent } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence/events-store';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus/event-bus.service';

@EventsHandler(UserSentMessageEvent)
export class UserSentMessageEventHandler implements IEventHandler<UserSentMessageEvent> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async handle(event: UserSentMessageEvent): Promise<void> {
    await this.roomStore.create(event);
    await this.eventBus.emitRoomEvent(event);
  }
}
