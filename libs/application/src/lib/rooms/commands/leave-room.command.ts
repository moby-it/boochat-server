import { AnnouncementCreatedEvent, Result, RoomId, GoogleId, UserLeftRoomEvent } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence/events-store';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus';

export class LeaveRoomCommand {
  constructor(public readonly userId: GoogleId, public readonly roomId: RoomId) {}
}
@CommandHandler(LeaveRoomCommand)
export class LeaveRoomCommandHandler implements ICommandHandler<LeaveRoomCommand> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async execute({ roomId, userId }: LeaveRoomCommand): Promise<Result> {
    try {
      const userLeftRoomEvent = new UserLeftRoomEvent(userId, roomId);
      await this.roomStore.save(userLeftRoomEvent);
      await this.eventBus.emitRoomEvent(userLeftRoomEvent);
      const newRoomItemEvent = new AnnouncementCreatedEvent(userId + ' left room', roomId, userId);
      await this.roomStore.save(newRoomItemEvent);
      await this.eventBus.emitRoomEvent(newRoomItemEvent);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
