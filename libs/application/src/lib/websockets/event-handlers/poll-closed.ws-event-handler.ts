import { PollClosedEvent } from '@boochat/domain';
import { MeetupsRepository } from '@boochat/persistence/read-db';
import { WebsocketEventsEnum } from '@boochat/shared';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { WsServer } from '../../common';

@EventsHandler(PollClosedEvent)
export class PollClosedWsEventHandler implements IEventHandler<PollClosedEvent> {
  constructor(private meetupRepository: MeetupsRepository) {}
  async handle(event: PollClosedEvent) {
    const meetupDocument = await this.meetupRepository.findById(event.meetupId);
    if (!meetupDocument) throw new WsException('did not find meetup for new poll');
    WsServer.emitToRoom(meetupDocument.id, WebsocketEventsEnum.POLL_CLOSED, { pollId: event.pollId });
  }
}
