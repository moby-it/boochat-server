import { RoomId, UserChangedRoomImageEvent } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence/events-store';
import { CommandHandler, ICommand, ICommandHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus';

export class ChangeRoomImageCommand implements ICommand {
  constructor(
    public readonly userId: string,
    public readonly roomId: RoomId,
    public readonly imageUrl: string
  ) {}
}
@CommandHandler(ChangeRoomImageCommand)
export class ChangeRoomImageCommandHandler implements ICommandHandler<ChangeRoomImageCommand> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async execute(command: ChangeRoomImageCommand): Promise<void> {
    const event = new UserChangedRoomImageEvent(command.userId, command.roomId, command.imageUrl);
    await this.roomStore.save(event);
    await this.eventBus.emitRoomEvent(event);
  }
}
