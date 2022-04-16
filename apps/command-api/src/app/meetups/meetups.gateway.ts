import {
  ChangeRsvpCommand,
  CreateMeetupCommand,
  CreateMeetupCommandResult,
  CreatePollCommand,
  CreateRoomCommand,
  CreateRoomCommandResult,
  GetUserByIdQuery,
  GetUserByIdQueryResult,
  VoteOnPollCommand
} from '@boochat/application';
import {
  ChangeRsvpDto,
  CreateMeetupDto,
  CreatePollDto,
  PollVoteDto,
  Result,
  RoomId,
  User,
  UserId
} from '@boochat/domain';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessageBody, SubscribeMessage, WebSocketGateway, WsException } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MeetupsGateway {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}
  @SubscribeMessage('createMeetup')
  async createMeetup(@MessageBody() createMeetupEvent: CreateMeetupDto) {
    const user = await this.getUser(createMeetupEvent.organizerId);
    const { name, attendeeIds, location, organizerId, takesPlaceOn, imageUrl } = createMeetupEvent;
    const createRoomResult = (await this.commandBus.execute(
      new CreateRoomCommand(user.id, name, imageUrl, attendeeIds)
    )) as CreateRoomCommandResult;
    if (createRoomResult.failed) throw new WsException('CreateMeetupEvent: Failed to create room');
    const roomId = createRoomResult.props as RoomId;
    const result = (await this.commandBus.execute(
      new CreateMeetupCommand(
        user.id,
        name,
        attendeeIds,
        location,
        organizerId,
        takesPlaceOn,
        roomId,
        imageUrl
      )
    )) as CreateMeetupCommandResult;
    if (result.failed) throw new WsException('failed to create meetup');
  }

  @SubscribeMessage('changeRsvp')
  async changeRsvp(@MessageBody() changeRsvpEvent: ChangeRsvpDto) {
    const user = await this.getUser(changeRsvpEvent.userId);
    const { meetupId, rsvp } = changeRsvpEvent;
    const result = (await this.commandBus.execute(new ChangeRsvpCommand(user.id, meetupId, rsvp))) as Result;
    if (result.failed) throw new WsException('failed to change rsvp');
  }
  @SubscribeMessage('createPoll')
  async createPoll(@MessageBody() createPollEvent: CreatePollDto) {
    const user = await this.getUser(createPollEvent.userId);
    const { meetupId, description, pollType, pollChoices } = createPollEvent;
    const result = (await this.commandBus.execute(
      new CreatePollCommand(user.id, meetupId, pollType, description, pollChoices)
    )) as Result;
    if (result.failed) throw new WsException('failed to vote on poll');
  }
  @SubscribeMessage('castPollVote')
  async voteOnPoll(@MessageBody() pollVoteEvent: PollVoteDto) {
    const user = await this.getUser(pollVoteEvent.userId);
    const { pollId, choiceIndex, meetupId } = pollVoteEvent;
    const result = (await this.commandBus.execute(
      new VoteOnPollCommand(user.id, pollId, meetupId, choiceIndex)
    )) as Result;
    if (result.failed) throw new WsException('failed to vote on poll');
  }
  private async getUser(userId: UserId): Promise<User> {
    const result = (await this.queryBus.execute(new GetUserByIdQuery(userId))) as GetUserByIdQueryResult;
    if (result.failed) throw new WsException('user not found');
    return result.props as User;
  }
}
