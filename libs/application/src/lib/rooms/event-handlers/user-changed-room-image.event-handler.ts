import { MeetupImageChangedEvent } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
@EventsHandler(MeetupImageChangedEvent)
export class UserChangedRoomImageEventHandler implements IEventHandler<MeetupImageChangedEvent> {
  constructor(private repository: RoomsRepository) {}
  async handle(event: MeetupImageChangedEvent): Promise<void> {
    await this.repository.updateRoomImage(event.imageUrl, event.imageUrl);
  }
}
