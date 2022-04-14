import { Result, RoomId, UserId, UserLeftRoomEvent } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence/events-store';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus';

export class LeaveRoomCommand {
  constructor(public readonly userId: UserId, public readonly roomId: RoomId) {}
}
@CommandHandler(LeaveRoomCommand)
export class LeaveRoomCommandHandler implements ICommandHandler<LeaveRoomCommand> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async execute({ roomId, userId }: LeaveRoomCommand): Promise<Result> {
    try {
      const event = new UserLeftRoomEvent(userId, roomId);
      await this.roomStore.save(event);
      await this.eventBus.emitRoomEvent(event);
      return Result.success();
    } catch (e) {
      console.error(e);

      return Result.fail(e);
    }
  }
}
