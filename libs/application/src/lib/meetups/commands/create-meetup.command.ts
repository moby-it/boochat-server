import { Result, RoomId, UserCreatedMeetupEvent, UserId } from '@boochat/domain';
import { MeetupEventStoreService } from '@boochat/persistence/events-store';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus';

export class CreateMeetupCommand {
  constructor(
    public readonly userId: UserId,
    public readonly name: string,
    public readonly attendeeIds: UserId[],
    public readonly location: string,
    public readonly organizerId: UserId,
    public readonly takesPlaceOn: Date,
    public readonly roomId: RoomId,
    public readonly imageUrl: string
  ) {}
}
export type CreateMeetupCommandResult = Result<string | undefined>;
@CommandHandler(CreateMeetupCommand)
export class CreateMeetupCommandHandler implements ICommandHandler<CreateMeetupCommand> {
  constructor(private meetupStore: MeetupEventStoreService, private eventBus: EventBusService) {}
  async execute(command: CreateMeetupCommand): Promise<CreateMeetupCommandResult> {
    try {
      const { userId, attendeeIds, name, location, organizerId, roomId, takesPlaceOn, imageUrl } = command;
      const event = new UserCreatedMeetupEvent(
        userId,
        name,
        attendeeIds,
        location,
        organizerId,
        takesPlaceOn,
        imageUrl,
        roomId
      );
      await this.meetupStore.save(event);
      await this.eventBus.emitMeetupEvent(event);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
