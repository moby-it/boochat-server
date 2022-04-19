import { ChangeRsvpDto, RsvpChangedEvent } from '@boochat/domain';
import { WebsocketEventsEnum } from '@boochat/shared';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WsServer } from '../../common';

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
