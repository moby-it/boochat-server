import { UserLeftRoomEvent } from '@boochat/domain';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ActiveUsersService } from '../../users';

@EventsHandler(UserLeftRoomEvent)
export class LeftRoomWsEventHandler implements IEventHandler<UserLeftRoomEvent> {
  constructor(private activeUserService: ActiveUsersService) {}
  async handle(event: UserLeftRoomEvent) {
    await this.activeUserService.disconnectUserFromRoom(event.userId, event.roomId);
  }
}
