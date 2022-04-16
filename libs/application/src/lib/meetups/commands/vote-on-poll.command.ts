import { PollId, Result, PollVoteEvent, UserId, MeetupId } from '@boochat/domain';
import { MeetupEventStoreService } from '@boochat/persistence/events-store';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { EventBusService } from '../../event-bus';

export class VoteOnPollCommand {
  constructor(
    public readonly userId: UserId,
    public readonly pollId: PollId,
    public readonly meetupId: MeetupId,
    public readonly choiceIndex: number
  ) {}
}
@CommandHandler(VoteOnPollCommand)
export class VoteOnPollCommandHandler implements ICommandHandler<VoteOnPollCommand> {
  constructor(private meetupStore: MeetupEventStoreService, private eventBus: EventBusService) {}
  async execute(command: VoteOnPollCommand): Promise<Result> {
    try {
      const { userId, pollId, choiceIndex, meetupId } = command;
      const event = new PollVoteEvent(userId, pollId, meetupId, choiceIndex);
      await this.meetupStore.save(event);
      await this.eventBus.emitMeetupEvent(event);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
