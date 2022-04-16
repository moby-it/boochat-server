import { CreateMeetupDto, UserCreatedMeetupEvent } from '@boochat/domain';
import { MeetupsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

@EventsHandler(UserCreatedMeetupEvent)
export class MeetupCreatedEventHandler implements IEventHandler<UserCreatedMeetupEvent> {
  constructor(private repository: MeetupsRepository) {}
  async handle(event: UserCreatedMeetupEvent) {
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
