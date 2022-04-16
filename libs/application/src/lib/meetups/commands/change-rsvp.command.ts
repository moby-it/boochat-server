import { MeetupId, Result, Rsvp, RsvpChangedEvent, UserId } from '@boochat/domain';
import { MeetupEventStoreService } from '@boochat/persistence/events-store';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus';

export class ChangeRsvpCommand {
  constructor(
    public readonly userId: UserId,
    public readonly meetupId: MeetupId,
    public readonly rsvp: Rsvp
  ) {}
}
@CommandHandler(ChangeRsvpCommand)
export class ChangeRsvpCommandHandler implements ICommandHandler<ChangeRsvpCommand> {
  constructor(private meetupStore: MeetupEventStoreService, private eventBus: EventBusService) {}
  async execute(command: ChangeRsvpCommand): Promise<Result> {
    try {
      const { userId, meetupId, rsvp } = command;
      const event = new RsvpChangedEvent(userId, meetupId, rsvp);
      await this.meetupStore.save(event);
      await this.eventBus.emitMeetupEvent(event);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
