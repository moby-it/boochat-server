import { UserChangedRsvpEvent } from '@boochat/domain';
import { MeetupsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserChangedRsvpEvent)
export class UserChangedRsvpEventHandler implements IEventHandler<UserChangedRsvpEvent> {
  constructor(private repository: MeetupsRepository) {}
  async handle(event: UserChangedRsvpEvent) {
    await this.repository.changeRsvp(event.userId, event.meetupId, event.rsvp);
  }
}
