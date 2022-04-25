import { Notification, PollVoteEvent } from '@boochat/domain';
import { MeetupsRepository } from '@boochat/persistence/read-db';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { WsException } from '@nestjs/websockets';
import { Mapper } from '../../mapper';
import { DialogNotificationService } from '../../notifications';

@EventsHandler(PollVoteEvent)
export class PollVoteEventHandler implements IEventHandler<PollVoteEvent> {
  constructor(
    private repository: MeetupsRepository,
    private mapper: Mapper,
    private notification: DialogNotificationService
  ) {}
  async handle(event: PollVoteEvent) {
    const { userId, pollId, meetupId, pollChoiceIndex } = event;
    const meetupDocument = await this.repository.findById(meetupId);
    if (!meetupDocument) throw new WsException('failed to fetch meetup');
    const meetup = this.mapper.meetups.fromDocument.ToMeetup(meetupDocument);
    if (meetup.pollIsActive(pollId) && !meetup.userHasVotedOnPoll(userId, pollId)) {
      await this.repository.voteOnPoll(userId, pollId, meetupId, pollChoiceIndex);
    } else {
      const notification = Notification.createWarning('Warning', 'You have already voted');
      this.notification.send(userId, notification);
    }
  }
}
