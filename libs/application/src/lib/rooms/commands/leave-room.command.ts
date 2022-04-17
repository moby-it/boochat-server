import { AnnouncementCreatedEvent, Result, RoomId, UserId, UserLeftRoomEvent } from '@boochat/domain';
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
      const userLeftRoomEventt = new UserLeftRoomEvent(userId, roomId);
      await this.roomStore.save(userLeftRoomEventt);
      await this.eventBus.emitRoomEvent(userLeftRoomEventt);
      const newRoomItemEvent = new AnnouncementCreatedEvent(userId + ' left room', roomId, userId);
      await this.roomStore.save(newRoomItemEvent);
      await this.eventBus.emitRoomEvent(newRoomItemEvent);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
