import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserChangedRoomImageEvent } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence/events-store';
import { EventBusService } from '../../event-bus';
@EventsHandler(UserChangedRoomImageEvent)
export class UserChangedRoomImageEventHandler implements IEventHandler<UserChangedRoomImageEvent> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async handle(event: UserChangedRoomImageEvent): Promise<void> {
    await this.roomStore.create(event);
    await this.eventBus.emitRoomEvent(event);
  }
}
