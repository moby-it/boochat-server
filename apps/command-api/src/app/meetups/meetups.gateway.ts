import {
  AuthService,
  ChangeRsvpCommand,
  ClosePollCommand,
  CreateMeetupCommand,
  CreateMeetupCommandResult,
  CreatePollCommand,
  CreateRoomCommand,
  CreateRoomCommandResult,
  Token,
  VoteOnPollCommand,
  WsJwtGuard
} from '@boochat/application';
import {
  ChangeRsvpDto,
  ClosePollDto,
  CreateMeetupDto,
  CreatePollDto,
  PollVoteDto,
  Result,
  RoomId
} from '@boochat/domain';
import { CommandSocketEventsEnum } from '@boochat/shared';
import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessageBody, SubscribeMessage, WebSocketGateway, WsException } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
@UseGuards(WsJwtGuard)
export class MeetupsGateway {
  constructor(private commandBus: CommandBus, private authService: AuthService) {}

  @SubscribeMessage(CommandSocketEventsEnum.CREATE_MEETUP)
  async createMeetup(@Token() token: string, @MessageBody() createMeetupEvent: CreateMeetupDto) {
    const userId = await this.authService.getUserId(token);
    const { name, attendeeIds, location, takesPlaceOn, imageUrl } = createMeetupEvent;
    const createRoomResult = (await this.commandBus.execute(
      new CreateRoomCommand(userId, name, imageUrl, attendeeIds)
    )) as CreateRoomCommandResult;
    if (createRoomResult.failed) throw new WsException('CreateMeetupEvent: Failed to create room');
    const roomId = createRoomResult.props as RoomId;
    const result = (await this.commandBus.execute(
      new CreateMeetupCommand(userId, name, attendeeIds, location, userId, takesPlaceOn, roomId, imageUrl)
    )) as CreateMeetupCommandResult;
    if (result.failed) throw new WsException('failed to create meetup');
  }

  @SubscribeMessage(CommandSocketEventsEnum.CHANGE_RSVP)
  async changeRsvp(@Token() token: string, @MessageBody() dto: ChangeRsvpDto) {
    const userId = await this.authService.getUserId(token);
    const { meetupId, rsvp } = dto;
    const result = (await this.commandBus.execute(new ChangeRsvpCommand(userId, meetupId, rsvp))) as Result;
    if (result.failed) throw new WsException('failed to change rsvp');
  }
  @SubscribeMessage(CommandSocketEventsEnum.CREATE_POLL)
  async createPoll(@Token() token: string, @MessageBody() dto: CreatePollDto) {
    const userId = await this.authService.getUserId(token);
    const { meetupId, description, pollType, pollChoices } = dto;
    const result = (await this.commandBus.execute(
      new CreatePollCommand(userId, meetupId, pollType, description, pollChoices)
    )) as Result;
    if (result.failed) throw new WsException('failed to vote on poll');
  }
  @SubscribeMessage(CommandSocketEventsEnum.POLL_VOTE)
  async voteOnPoll(@Token() token: string, @MessageBody() dto: PollVoteDto) {
    const userId = await this.authService.getUserId(token);
    const { pollId, choiceIndex, meetupId } = dto;
    const result = (await this.commandBus.execute(
      new VoteOnPollCommand(userId, pollId, meetupId, choiceIndex)
    )) as Result;
    if (result.failed) throw new WsException('failed to vote on poll');
  }
  @SubscribeMessage(CommandSocketEventsEnum.CLOSE_POLL)
  async closePoll(@Token() token: string, @MessageBody() dto: ClosePollDto) {
    const userId = await this.authService.getUserId(token);
    const { pollId, meetupId } = dto;
    const result = (await this.commandBus.execute(new ClosePollCommand(userId, pollId, meetupId))) as Result;
    if (result.failed) throw new WsException('failed to close poll');
  }
}
