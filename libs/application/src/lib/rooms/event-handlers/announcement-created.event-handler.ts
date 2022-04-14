import { AnnouncementCreatedEvent } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
@EventsHandler(AnnouncementCreatedEvent)
export class AnnouncementCreatedEventHandler implements IEventHandler<AnnouncementCreatedEvent> {
  constructor(private repository: RoomsRepository) {}
  async handle(event: AnnouncementCreatedEvent): Promise<void> {
    await this.repository.saveAnnouncement(event.content, event.roomId);
  }
}
