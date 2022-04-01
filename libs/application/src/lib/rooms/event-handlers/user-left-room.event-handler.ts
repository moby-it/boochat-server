import { UserLeftRoomEvent } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus/event-bus.service';

@EventsHandler(UserLeftRoomEvent)
export class UserLeftRoomEventHandler implements IEventHandler<UserLeftRoomEvent> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async handle(event: UserLeftRoomEvent): Promise<void> {
    await this.roomStore.create(event);
    await this.eventBus.emitRoomEvent(event);
  }
}
