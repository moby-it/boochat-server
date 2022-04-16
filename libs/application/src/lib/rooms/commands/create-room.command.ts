import { Result, UserCreatedRoomEvent, AnnouncementCreatedEvent } from '@boochat/domain';
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
      const userCreatedRoomRoomEvent = new UserCreatedRoomEvent(userId, roomName, imageUrl, userIds);
      const newAnnouncementEvent = new AnnouncementCreatedEvent(
        'Room Created',
        userCreatedRoomRoomEvent.id,
        userId
      );
      await this.roomStore.save(userCreatedRoomRoomEvent);
      await this.eventBus.emitRoomEvent(userCreatedRoomRoomEvent);
      await this.roomStore.save(newAnnouncementEvent);
      await this.eventBus.emitRoomEvent(newAnnouncementEvent);
      return Result.success();
    } catch (e) {
      console.error(e);
      return Result.fail(e);
    }
  }
}
