import {
  CreateRoomCommand,
  GetUserByIdQuery,
  GetUserByIdQueryResult,
  InviteUserToRoomCommand,
  LeaveRoomCommand
} from '@boochat/application';
import { CreateRoomDto, InviteUserToRoomDto, Result, User, UserId, UserLeftRoomDto } from '@boochat/domain';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException
} from '@nestjs/websockets';
import { Server } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class RoomsGateway {
  @WebSocketServer()
  server!: Server;
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}

  @SubscribeMessage('addUserToRoom')
  async inviteUserToRoom(@MessageBody() inviteUserToRoomDto: InviteUserToRoomDto): Promise<void> {
    const { userId, inviteeId, roomId } = inviteUserToRoomDto;
    const user = await this.getUser(userId);
    const invitee = await this.getUser(inviteeId);
    if (!user) throw new WsException(`inviteUserToRoom: UserId was not found`);
    if (!invitee) throw new WsException(`inviteUserToRoom: InviteeId was not found`);
    const result = (await this.commandBus.execute(
      new InviteUserToRoomCommand(userId, inviteeId, roomId)
    )) as Result;
    if (result.failed) throw new WsException(`InviteUserToRoomCommand failed`);
  }
  @SubscribeMessage('removeUserFromRoom')
  async removeUserFromRoom(@MessageBody() userLeftRoomDto: UserLeftRoomDto) {
    const { userId, roomId } = userLeftRoomDto;
    const user = await this.getUser(userId);
    if (!user) throw new WsException(`removeUserFromRoom: UserId was not found`);
    const result = (await this.commandBus.execute(new LeaveRoomCommand(userId, roomId))) as Result;
    if (result.failed) throw new WsException(`LeaveRoomCommand failed`);
  }

  @SubscribeMessage('createRoom')
  async createRoom(@MessageBody() createRoomEventDto: CreateRoomDto): Promise<void> {
    const user = await this.getUser(createRoomEventDto.userId);
    if (!user) throw new WsException(`createRoom: UserId was not found`);
    const { name, imageUrl, participantIds } = createRoomEventDto;
    const result: Result = await this.commandBus.execute(
      new CreateRoomCommand(user.id, name, imageUrl, participantIds)
    );
    if (result.failed) throw new WsException('failed to create room');
  }
  private async getUser(userId: UserId): Promise<User | undefined> {
    const result = (await this.queryBus.execute(new GetUserByIdQuery(userId))) as GetUserByIdQueryResult;
    return result.props;
  }
}
