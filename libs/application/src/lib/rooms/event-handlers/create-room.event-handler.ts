import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { CreateRoomEvent } from "@boochat/domain";
import { RoomEventsStoreService } from "@boochat/persistence";
import { EventBusService } from "../../event-bus/event-bus.service";

@EventsHandler(CreateRoomEvent)
export class CreateRoomEventHandler implements IEventHandler<CreateRoomEvent> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) { }
  async handle(event: CreateRoomEvent): Promise<void> {
    await this.roomStore.create(event);
    await this.eventBus.sendRoomEvent(event);
  }
}
