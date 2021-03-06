import { PollClosedEvent } from '@boochat/domain';
import { MeetupsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(PollClosedEvent)
export class PollClosedEventHandler implements IEventHandler<PollClosedEvent> {
  constructor(private repository: MeetupsRepository) {}
  async handle(event: PollClosedEvent) {
    await this.repository.closePoll(event.meetupId, event.pollId);
  }
}
