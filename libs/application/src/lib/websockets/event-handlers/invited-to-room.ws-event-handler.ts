import { UserInvitedToRoomEvent } from '@boochat/domain';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ActiveUsersService } from '../../users';

@EventsHandler(UserInvitedToRoomEvent)
export class InvitedToRoomWsEventHandler implements IEventHandler<UserInvitedToRoomEvent> {
  constructor(private activeUserService: ActiveUsersService) {}
  async handle(event: UserInvitedToRoomEvent) {
    await this.activeUserService.connectUserToRoom(event.inviteeId, event.roomId);
  }
}
