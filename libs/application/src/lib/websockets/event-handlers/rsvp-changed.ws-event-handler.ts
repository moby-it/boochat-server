import { ChangeRsvpDto, RsvpChangedEvent } from '@boochat/domain';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WebsocketEventsEnum, WsServer } from '../../common';

@EventsHandler(RsvpChangedEvent)
export class RsvpChangedWsEventHandler implements IEventHandler<RsvpChangedEvent> {
  async handle(event: RsvpChangedEvent) {
    const rsvp: ChangeRsvpDto = {
      meetupId: event.meetupId,
      rsvp: event.rsvp,
      userId: event.userId
    };
    WsServer.emitToRoom(event.meetupId, WebsocketEventsEnum.RSVP_CHANGED, rsvp);
  }
}
