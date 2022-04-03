import { GetUserByIdQuery, GetUserByIdQueryResult } from '@boochat/application';
import { ChangeRsvpDto, CreateMeetupDto, CreatePollDto, PollVoteDto, User, UserId } from '@boochat/domain';
import { QueryBus } from '@nestjs/cqrs';
import { MessageBody, SubscribeMessage, WebSocketGateway, WsException } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MeetupsGateway {
  constructor(private queryBus: QueryBus) {}
  @SubscribeMessage('createMeetup')
  async createMeetup(@MessageBody() createMeetupEvent: CreateMeetupDto) {
    const user = await this.getUser(createMeetupEvent.organizerId);
    const { name, attendeeIds, organizerId, takesPlaceOn } = createMeetupEvent;
    user.createMeetup(name, attendeeIds, organizerId, takesPlaceOn);
    user.commit();
  }
  @SubscribeMessage('changeRsvp')
  async changeRsvp(@MessageBody() changeRsvpEvent: ChangeRsvpDto) {
    const user = await this.getUser(changeRsvpEvent.userId);
    const { meetupId, rsvp } = changeRsvpEvent;
    user.changeRsvp(meetupId, rsvp);
    user.commit();
  }
  @SubscribeMessage('createPoll')
  async createPoll(@MessageBody() createPollEvent: CreatePollDto) {
    const user = await this.getUser(createPollEvent.userId);
    const { meetupId, description, pollChoices } = createPollEvent;
    user.createPoll(meetupId, description, pollChoices);
    user.commit();
  }
  @SubscribeMessage('castPollVote')
  async voteOnPoll(@MessageBody() pollVoteEvent: PollVoteDto) {
    const user = await this.getUser(pollVoteEvent.userId);
    const { pollId, choiceIndex } = pollVoteEvent;
    user.voteOnPoll(pollId, choiceIndex);
    user.commit();
  }
  private async getUser(userId: UserId): Promise<User> {
    const result = (await this.queryBus.execute(new GetUserByIdQuery(userId))) as GetUserByIdQueryResult;
    if (result.failed) throw new WsException('user not found');
    return result.props as User;
  }
}
