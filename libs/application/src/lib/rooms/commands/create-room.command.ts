import { Result, UserCreatedRoomEvent } from '@boochat/domain';
import { RoomEventsStoreService } from '@boochat/persistence/events-store';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus';

export class CreateRoomCommand {
  constructor(
    public userId: string,
    public readonly roomName: string,
    public readonly imageUrl: string,
    public readonly userIds: string[]
  ) {}
}
@CommandHandler(CreateRoomCommand)
export class CreateRoomCommandHandler implements ICommandHandler<CreateRoomCommand> {
  constructor(private roomStore: RoomEventsStoreService, private eventBus: EventBusService) {}
  async execute({ imageUrl, roomName, userId, userIds }: CreateRoomCommand): Promise<Result> {
    try {
      const event = new UserCreatedRoomEvent(userId, roomName, imageUrl, userIds);
      await this.roomStore.save(event);
      await this.eventBus.emitRoomEvent(event);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
