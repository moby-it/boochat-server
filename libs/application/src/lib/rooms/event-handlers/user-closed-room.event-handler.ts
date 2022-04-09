import { UserClosedRoomEvent } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence/events-store';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus/event-bus.service';

@EventsHandler(UserClosedRoomEvent)
export class UserClosedRoomEventHandler implements IEventHandler<UserClosedRoomEvent> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async handle(event: UserClosedRoomEvent): Promise<void> {
    await this.roomStore.create(event);
    await this.eventBus.emitRoomEvent(event);
  }
}
