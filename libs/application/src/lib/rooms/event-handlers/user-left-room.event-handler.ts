import { UserLeftRoomEvent } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserLeftRoomEvent)
export class UserLeftRoomEventHandler implements IEventHandler<UserLeftRoomEvent> {
  constructor(private repository: RoomsRepository) {}
  async handle(event: UserLeftRoomEvent): Promise<void> {
    await this.repository.leaveRoom(event.userId, event.roomId);
  }
}
