import { UserCastPollVoteEvent } from '@boochat/domain';
import { MeetupsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserCastPollVoteEvent)
export class UserCastVoteOnPollEventHandler implements IEventHandler<UserCastPollVoteEvent> {
  constructor(private repository: MeetupsRepository) {}
  async handle(event: UserCastPollVoteEvent) {
    await this.repository.voteOnPoll(event.userId, event.pollId, event.pollChoiceIndex);
  }
}
