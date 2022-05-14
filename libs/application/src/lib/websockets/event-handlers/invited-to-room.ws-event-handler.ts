import { UserInvitedToRoomEvent } from '@boochat/domain';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PushNotificationService } from '../../notifications';
import { ActiveUsersService } from '../../users';

@EventsHandler(UserInvitedToRoomEvent)
export class InvitedToRoomWsEventHandler implements IEventHandler<UserInvitedToRoomEvent> {
  constructor(
    private activeUserService: ActiveUsersService,
    private pushNotificationService: PushNotificationService
  ) {}
  async handle(event: UserInvitedToRoomEvent) {
    await this.activeUserService.connectUserToRoom(event.inviteeId, event.roomId);
    await this.pushNotificationService.subscribeToTopics(event.userId, [event.roomId]);
  }
}
