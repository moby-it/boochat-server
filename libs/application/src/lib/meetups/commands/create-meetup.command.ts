import { Result, RoomId, MeetupCreatedEvent, GoogleId } from '@boochat/domain';
import { MeetupEventStoreService } from '@boochat/persistence/events-store';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus';

export class CreateMeetupCommand {
  constructor(
    public readonly userId: GoogleId,
    public readonly name: string,
    public readonly attendeeIds: GoogleId[],
    public readonly location: string,
    public readonly organizerId: GoogleId,
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
      const event = new MeetupCreatedEvent(
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
