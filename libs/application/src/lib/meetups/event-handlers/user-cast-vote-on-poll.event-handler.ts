import { PollVoteEvent } from '@boochat/domain';
import { MeetupsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(PollVoteEvent)
export class UserCastVoteOnPollEventHandler implements IEventHandler<PollVoteEvent> {
  constructor(private repository: MeetupsRepository) {}
  async handle(event: PollVoteEvent) {
    await this.repository.voteOnPoll(event.userId, event.pollId, event.meetupId, event.pollChoiceIndex);
  }
}
