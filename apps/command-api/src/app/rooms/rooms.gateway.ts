import {
  AuthService,
  CreateRoomCommand,
  GetUserByIdQuery,
  GetUserByIdQueryResult,
  InviteUserToRoomCommand,
  LeaveRoomCommand,
  Token,
  WsJwtGuard
} from '@boochat/application';
import { CreateRoomDto, InviteUserToRoomDto, Result, User, UserId, UserLeftRoomDto } from '@boochat/domain';
import { UseGuards } from '@nestjs/common';
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
@UseGuards(WsJwtGuard)
export class RoomsGateway {
  @WebSocketServer()
  server!: Server;
  constructor(private authService: AuthService, private commandBus: CommandBus) {}

  @SubscribeMessage('addUserToRoom')
  async inviteUserToRoom(
    @Token() token: string,
    @MessageBody() inviteUserToRoomDto: InviteUserToRoomDto
  ): Promise<void> {
    const { inviteeId, roomId } = inviteUserToRoomDto;
    const userId = await this.authService.getUserId(token);
    const result = (await this.commandBus.execute(
      new InviteUserToRoomCommand(userId, inviteeId, roomId)
    )) as Result;
    if (result.failed) throw new WsException(`InviteUserToRoomCommand failed`);
  }
  @SubscribeMessage('userLeftRoom')
  async removeUserFromRoom(@Token() token: string, @MessageBody() userLeftRoomDto: UserLeftRoomDto) {
    const { roomId } = userLeftRoomDto;
    const userId = await this.authService.getUserId(token);
    const result = (await this.commandBus.execute(new LeaveRoomCommand(userId, roomId))) as Result;
    if (result.failed) throw new WsException(`LeaveRoomCommand failed`);
  }

  @SubscribeMessage('createRoom')
  async createRoom(@Token() token: string, @MessageBody() createRoomEventDto: CreateRoomDto): Promise<void> {
    const userId = await this.authService.getUserId(token);
    const { name, imageUrl, participantIds } = createRoomEventDto;
    const result: Result = await this.commandBus.execute(
      new CreateRoomCommand(userId, name, imageUrl, participantIds)
    );
    if (result.failed) throw new WsException('failed to create room');
  }
}
