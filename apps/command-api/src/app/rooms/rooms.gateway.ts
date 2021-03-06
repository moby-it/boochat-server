import {
  AuthService,
  ClosedRoomCommand,
  CreateRoomCommand,
  InviteUserToRoomCommand,
  LeaveRoomCommand,
  WsToken,
  WsJwtGuard
} from '@boochat/application';
import {
  CreateRoomDto,
  InviteUserToRoomDto,
  Result,
  UserClosedRoomDto,
  UserLeftRoomDto
} from '@boochat/domain';
import { CommandSocketEventsEnum } from '@boochat/shared';
import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
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

  @SubscribeMessage(CommandSocketEventsEnum.ADD_USER_TO_ROOM)
  async inviteUserToRoom(
    @WsToken() token: string,
    @MessageBody() inviteUserToRoomDto: InviteUserToRoomDto
  ): Promise<void> {
    const { inviteeId, roomId } = inviteUserToRoomDto;
    const userId = await this.authService.getUserId(token);
    const result = (await this.commandBus.execute(
      new InviteUserToRoomCommand(userId, inviteeId, roomId)
    )) as Result;
    if (result.failed) throw new WsException(`InviteUserToRoomCommand failed`);
  }
  @SubscribeMessage(CommandSocketEventsEnum.USER_LEFT_ROOM)
  async removeUserFromRoom(@WsToken() token: string, @MessageBody() userLeftRoomDto: UserLeftRoomDto) {
    const { roomId } = userLeftRoomDto;
    const userId = await this.authService.getUserId(token);
    const result = (await this.commandBus.execute(new LeaveRoomCommand(userId, roomId))) as Result;
    if (result.failed) throw new WsException(`LeaveRoomCommand failed`);
  }

  @SubscribeMessage(CommandSocketEventsEnum.CREATE_ROOM)
  async createRoom(
    @WsToken() token: string,
    @MessageBody() createRoomEventDto: CreateRoomDto
  ): Promise<void> {
    const userId = await this.authService.getUserId(token);
    const { name, imageUrl, participantIds } = createRoomEventDto;
    const result: Result = await this.commandBus.execute(
      new CreateRoomCommand(userId, name, imageUrl, participantIds)
    );
    if (result.failed) throw new WsException('failed to create room');
  }
  @SubscribeMessage(CommandSocketEventsEnum.CLOSED_ROOM)
  async closedRoom(@WsToken() token: string, @MessageBody() dto: UserClosedRoomDto): Promise<void> {
    const userId = await this.authService.getUserId(token);
    const { roomId } = dto;
    const result: Result = await this.commandBus.execute(new ClosedRoomCommand(userId, roomId, new Date()));
    if (result.failed) throw new WsException('failed to create room');
  }
}
