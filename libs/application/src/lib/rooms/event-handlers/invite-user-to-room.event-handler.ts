import { InviteUserToRoomEvent } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus/event-bus.service';

@EventsHandler(InviteUserToRoomEvent)
export class InviteUserToRoomEventHandler implements IEventHandler<InviteUserToRoomEvent> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async handle(event: InviteUserToRoomEvent): Promise<void> {
    await this.roomStore.create(event);
    await this.eventBus.emitRoomEvent(event);
  }
}
