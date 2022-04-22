import { MeetupId, PollClosedEvent, PollId, Result, GoogleId } from '@boochat/domain';
import { MeetupEventStoreService } from '@boochat/persistence/events-store';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus';

export class ClosePollCommand {
  constructor(
    public readonly userId: GoogleId,
    public readonly pollId: PollId,
    public readonly meetupId: MeetupId
  ) {}
}
@CommandHandler(ClosePollCommand)
export class ClosePollCommandHandler implements ICommandHandler<ClosePollCommand> {
  constructor(private meetupStore: MeetupEventStoreService, private eventBus: EventBusService) {}
  async execute(command: ClosePollCommand): Promise<Result> {
    try {
      const { userId, pollId, meetupId } = command;
      const event = new PollClosedEvent(userId, meetupId, pollId);
      await this.meetupStore.save(event);
      await this.eventBus.emitMeetupEvent(event);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
