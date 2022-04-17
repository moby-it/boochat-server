import { PollVote, PollVoteEvent } from '@boochat/domain';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { transformToPlain, WebsocketEventsEnum, WsServer } from '../../common';

@EventsHandler(PollVoteEvent)
export class PollVoteWsEventHandler implements IEventHandler<PollVoteEvent> {
  async handle(event: PollVoteEvent) {
    const vote = new PollVote({
      choiceIndex: event.pollChoiceIndex,
      pollId: event.pollId,
      userId: event.userId
    });
    WsServer.emitToRoom(event.meetupId, WebsocketEventsEnum.POLL_VOTE, transformToPlain(vote));
  }
}
