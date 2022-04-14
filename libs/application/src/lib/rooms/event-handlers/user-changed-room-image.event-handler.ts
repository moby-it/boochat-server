import { UserChangedRoomImageEvent } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
@EventsHandler(UserChangedRoomImageEvent)
export class UserChangedRoomImageEventHandler implements IEventHandler<UserChangedRoomImageEvent> {
  constructor(private repository: RoomsRepository) {}
  async handle(event: UserChangedRoomImageEvent): Promise<void> {
    await this.repository.updateRoomImage(event.imageUrl, event.imageUrl);
  }
}
