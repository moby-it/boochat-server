import { PollCreatedEvent } from '@boochat/domain';
import { MeetupsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(PollCreatedEvent)
export class UserCreatedPollEventHandler implements IEventHandler<PollCreatedEvent> {
  constructor(private repository: MeetupsRepository) {}
  async handle(event: PollCreatedEvent) {
    const meetup = await this.repository.findById(event.meetupId);
    if (!meetup) throw new Error('CreatePollEventHandler: cannot find meetup');
    await this.repository.createPoll({
      _id: event.id,
      description: event.description,
      meetupId: event.meetupId,
      participantIds: meetup.attendeeIds,
      pollType: event.pollType,
      pollChoices: event.pollChoices,
      userId: event.userId
    });
  }
}
