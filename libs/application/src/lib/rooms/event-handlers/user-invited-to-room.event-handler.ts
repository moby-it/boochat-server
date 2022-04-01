import { UserInvitedToRoomEvent } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus/event-bus.service';

@EventsHandler(UserInvitedToRoomEvent)
export class UserInvitedToRoomEventHandler implements IEventHandler<UserInvitedToRoomEvent> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async handle(event: UserInvitedToRoomEvent): Promise<void> {
    await this.roomStore.create(event);
    await this.eventBus.emitRoomEvent(event);
  }
}
