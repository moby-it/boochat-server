import { PollClosedEvent, PollVoteEvent } from '@boochat/domain';
import { MeetupsRepository } from '@boochat/persistence/read-db';
import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { Mapper } from '../../mapper';

@EventsHandler(PollVoteEvent)
export class VoteOnPollEventHandler implements IEventHandler<PollVoteEvent> {
  constructor(private repository: MeetupsRepository, private mapper: Mapper, private eventBus: EventBus) {}
  async handle(event: PollVoteEvent) {
    const meetupDocument = await this.repository.findById(event.meetupId);
    if (!meetupDocument) throw new WsException('failed to fetch meetup');
    const meetup = this.mapper.meetups.fromDocument.ToMeetup(meetupDocument);
    if (meetup.canVoteOnPoll(event.pollId)) {
      await this.repository.voteOnPoll(event.userId, event.pollId, event.meetupId, event.pollChoiceIndex);
      if (meetup.shouldClosePoll(event.pollId)) {
        this.eventBus.publish(new PollClosedEvent(event.userId, event.meetupId, event.pollId));
      }
    }
  }
}
