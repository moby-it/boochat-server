import { Meetup, MeetupCreatedEvent } from '@boochat/domain';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WebsocketEventsEnum, WsServer } from '../../common';
import { ActiveUsersService } from '../../users';

@EventsHandler(MeetupCreatedEvent)
export class MeetupCreatedWsEventHandler implements IEventHandler<MeetupCreatedEvent> {
  constructor(private activeUserService: ActiveUsersService) {}
  async handle(event: MeetupCreatedEvent) {
    for (const userId of event.attendeeIds) {
      await this.activeUserService.connectUserToRoom(userId, event.id);
    }
    const meetup = Meetup.create(
      {
        alerts: [],
        attendants: event.attendeeIds.map((id) => ({ id })),
        location: event.location,
        takesPlaceOn: event.takesPlaceOn,
        name: event.name,
        organizer: { id: event.organizerId },
        polls: [],
        room: { id: event.roomId }
      },
      event.id
    );
    WsServer.emitToRoom(event.id, WebsocketEventsEnum.NEW_MEETUP, meetup);
  }
}
