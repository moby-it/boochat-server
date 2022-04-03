import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedRoomEvent } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence';
import { EventBusService } from '../../event-bus/event-bus.service';

@EventsHandler(UserCreatedRoomEvent)
export class UserCreatedRoomEventHandler implements IEventHandler<UserCreatedRoomEvent> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async handle(event: UserCreatedRoomEvent): Promise<void> {
    await this.roomStore.create(event);
    await this.eventBus.emitRoomEvent(event);
  }
}
