import { Result, RoomId, RoomImageChangedEvent, UserClosedRoomEvent, UserId } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence/events-store';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus';

export class ClosedRoomCommand implements ICommand {
  constructor(public readonly userId: UserId, public readonly roomId: RoomId, public readonly timestamp: Date) {}
}
@CommandHandler(ClosedRoomCommand)
export class ClosedRoomCommandHandler implements ICommandHandler<ClosedRoomCommand> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async execute(command: ClosedRoomCommand): Promise<Result> {
    try {
      const { userId, roomId, timestamp } = command;
      const event = new UserClosedRoomEvent(userId, roomId, timestamp);
      await this.roomStore.save(event);
      await this.eventBus.emitRoomEvent(event);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
