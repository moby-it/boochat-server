import { Result, RoomId, UserId, UserInvitedToRoomEvent } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence/events-store';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus';

export class InviteUserToRoomCommand {
  constructor(
    public readonly userId: UserId,
    public readonly inviteeId: UserId,
    public readonly roomId: RoomId
  ) {}
}
@CommandHandler(InviteUserToRoomCommand)
export class InviteUserToRoomCommandHandler implements ICommandHandler<InviteUserToRoomCommand> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async execute({ roomId, inviteeId, userId }: InviteUserToRoomCommand): Promise<Result> {
    try {
      const event = new UserInvitedToRoomEvent(userId, inviteeId, roomId);
      await this.roomStore.save(event);
      await this.eventBus.emitRoomEvent(event);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
