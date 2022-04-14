import { UserInvitedToRoomEvent } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserInvitedToRoomEvent)
export class UserInvitedToRoomEventHandler implements IEventHandler<UserInvitedToRoomEvent> {
  constructor(private repository: RoomsRepository) {}
  async handle(event: UserInvitedToRoomEvent): Promise<void> {
    await this.repository.inviteUserToRoom(event.inviteeId, event.roomId);
  }
}
