import { AnnouncementCreatedEvent, Result, RoomId, UserId, UserInvitedToRoomEvent } from '@boochat/domain';
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
      const userInvitedToRoomEvent = new UserInvitedToRoomEvent(userId, inviteeId, roomId);
      await this.roomStore.save(userInvitedToRoomEvent);
      await this.eventBus.emitRoomEvent(userInvitedToRoomEvent);
      const newRoomItemEvent = new AnnouncementCreatedEvent(inviteeId + ' joined room', roomId, userId);
      await this.roomStore.save(newRoomItemEvent);
      await this.eventBus.emitRoomEvent(newRoomItemEvent);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
