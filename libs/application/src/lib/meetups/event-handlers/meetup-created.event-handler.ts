import { CreateMeetupDto, MeetupCreatedEvent } from '@boochat/domain';
import { MeetupsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(MeetupCreatedEvent)
export class MeetupCreatedEventHandler implements IEventHandler<MeetupCreatedEvent> {
  constructor(private repository: MeetupsRepository) {}
  async handle(event: MeetupCreatedEvent) {
    const dto: CreateMeetupDto = {
      _id: event.id,
      attendeeIds: event.attendeeIds,
      location: event.location,
      name: event.name,
      organizerId: event.organizerId,
      takesPlaceOn: event.takesPlaceOn,
      imageUrl: event.imageUrl,
      roomId: event.roomId
    };
    await this.repository.createMeetup(dto);
  }
}
