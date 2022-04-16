import { RoomImageChangedEvent } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
@EventsHandler(RoomImageChangedEvent)
export class UserChangedRoomImageEventHandler implements IEventHandler<RoomImageChangedEvent> {
  constructor(private repository: RoomsRepository) {}
  async handle(event: RoomImageChangedEvent): Promise<void> {
    await this.repository.updateRoomImage(event.imageUrl, event.imageUrl);
  }
}
