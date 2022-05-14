import { UserLeftRoomEvent } from '@boochat/domain';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { PushNotificationService } from '../../notifications';
import { ActiveUsersService } from '../../users';

@EventsHandler(UserLeftRoomEvent)
export class LeftRoomWsEventHandler implements IEventHandler<UserLeftRoomEvent> {
  constructor(
    private activeUserService: ActiveUsersService,
    private pushNotificationService: PushNotificationService
  ) {}
  async handle(event: UserLeftRoomEvent) {
    await this.activeUserService.disconnectUserFromRoom(event.userId, event.roomId);
    await this.pushNotificationService.unsubscribeFromTopics(event.userId, [event.roomId]);
  }
}
