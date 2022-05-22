import { UserClosedRoomEvent } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserClosedRoomEvent)
export class UserClosedRoomEventHandler implements IEventHandler<UserClosedRoomEvent> {
  constructor(private repository: RoomsRepository) {}
  async handle(event: UserClosedRoomEvent): Promise<void> {
    await this.repository.logLastVisit(event.roomId, event.userId, event.timestamp);
  }
}
