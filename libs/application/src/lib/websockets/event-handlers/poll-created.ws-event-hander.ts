import { Poll, PollCreatedEvent, PollStatusEnum } from '@boochat/domain';
import { MeetupsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { transformToPlain, WebsocketEventsEnum, WsServer } from '../../common';

@EventsHandler(PollCreatedEvent)
export class PollCreatedWsEventHandler implements IEventHandler<PollCreatedEvent> {
  constructor(private meetupRepository: MeetupsRepository) {}
  async handle(event: PollCreatedEvent) {
    const meetupDocument = await this.meetupRepository.findById(event.meetupId);
    if (!meetupDocument) throw new WsException('did not find meetup for new poll');
    const poll = Poll.create(
      {
        creatorId: event.userId,
        dateCreated: event.createdAt,
        description: event.description,
        meetupId: event.meetupId,
        participantIds: meetupDocument.attendeeIds,
        pollChoices: event.pollChoices,
        status: PollStatusEnum.ACTIVE,
        type: event.type,
        votes: []
      },
      event.id
    );
    WsServer.emitToRoom(meetupDocument.id, WebsocketEventsEnum.POLL_CREATED, transformToPlain(poll));
  }
}
