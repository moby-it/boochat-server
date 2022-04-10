import { GetUserByIdQuery, GetUserByIdQueryResult } from '@boochat/application';
import {
  CreateRoomDto,
  InviteUserToRoomDto,
  User,
  UserClosedRoomDto,
  UserId,
  UserLeftRoomDto
} from '@boochat/domain';
import { QueryBus } from '@nestjs/cqrs';
import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class RoomsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;
  constructor(private queryBus: QueryBus) {}
  async handleDisconnect(client: Socket) {
    const lastVisitedRoom = client.data.lastVisitedRoom;
    if (lastVisitedRoom?.roomId && lastVisitedRoom?.userId) {
      const { roomId, userId } = lastVisitedRoom;
      const user = await this.getUser(userId);
      if (!user) throw new WsException(`handleDisconnect: UserId was not found`);
      user.closedRoom(userId, roomId, new Date());
      user.cameOffline();
      user.commit();
      return;
    }
    console.warn('Failed to log last room visit');
  }
  @SubscribeMessage('addUserToRoom')
  async inviteUserToRoom(@MessageBody() inviteUserToRoomDto: InviteUserToRoomDto): Promise<void> {
    const { userId, inviteeId, roomId } = inviteUserToRoomDto;
    const user = await this.getUser(userId);
    const invitee = await this.getUser(inviteeId);
    if (!user) throw new WsException(`inviteUserToRoom: UserId was not found`);
    if (!invitee) throw new WsException(`inviteUserToRoom: InviteeId was not found`);
    user.inviteUserToRoom(inviteeId, roomId);
    user.commit();
  }
  @SubscribeMessage('removeUserFromRoom')
  async removeUserFromRoom(@MessageBody() userLeftRoomDto: UserLeftRoomDto) {
    const { userId, roomId } = userLeftRoomDto;
    const user = await this.getUser(userId);
    if (!user) throw new WsException(`removeUserFromRoom: UserId was not found`);
    user.leaveRoom(roomId);
    user.commit();
  }
  @SubscribeMessage('userClosedRoom')
  async userClosedRoom(@MessageBody() userClosedRoomDto: UserClosedRoomDto) {
    const { userId, roomId } = userClosedRoomDto;
    const user = await this.getUser(userId);
    if (!user) throw new WsException(`userClosedRoom: UserId was not found`);
    user.closedRoom(userId, roomId, new Date());
    user.commit();
  }
  @SubscribeMessage('createRoom')
  async createRoom(@MessageBody() createRoomEventDto: CreateRoomDto): Promise<void> {
    const user = await this.getUser(createRoomEventDto.userId);
    if (!user) throw new WsException(`createRoom: UserId was not found`);
    const { roomName, imageUrl, userIds } = createRoomEventDto;
    user.createRoom(roomName, imageUrl, userIds);
    user.commit();
  }
  private async getUser(userId: UserId): Promise<User | undefined> {
    const result = (await this.queryBus.execute(new GetUserByIdQuery(userId))) as GetUserByIdQueryResult;
    if (result.failed) console.error(result.error);
    return result.props;
  }
}
