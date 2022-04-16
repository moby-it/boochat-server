import { RsvpChangedEvent } from '@boochat/domain';
import { MeetupsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(RsvpChangedEvent)
export class UserChangedRsvpEventHandler implements IEventHandler<RsvpChangedEvent> {
  constructor(private repository: MeetupsRepository) {}
  async handle(event: RsvpChangedEvent) {
    await this.repository.changeRsvp(event.userId, event.meetupId, event.rsvp);
  }
}
