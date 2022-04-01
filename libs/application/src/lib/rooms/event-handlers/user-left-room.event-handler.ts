import { LeaveRoomEvent } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus/event-bus.service';

@EventsHandler(LeaveRoomEvent)
export class CreateRoomEventHandler implements IEventHandler<LeaveRoomEvent> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async handle(event: LeaveRoomEvent): Promise<void> {
    await this.roomStore.create(event);
    await this.eventBus.emitRoomEvent(event);
  }
}
