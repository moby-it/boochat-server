import { QueryBus } from "@nestjs/cqrs";
import { MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer, WsException } from "@nestjs/websockets";
import { FindRoomByIdQuery, FindRoomByIdQueryResult, GetUserByIdQuery, GetUserByIdQueryResult } from "@oursocial/application";
import { RoomId, User, UserId } from "@oursocial/domain";
import { Server, Socket } from "socket.io";
@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class RoomsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;
  constructor(private queryBus: QueryBus) { }
  async handleDisconnect(client: Socket) {
    const lastVisitedRoom = client.data.lastVisitedRoom as LastRoomVisitDto;
    if (lastVisitedRoom?.roomId && lastVisitedRoom?.userId) {
      const { roomId, userId } = lastVisitedRoom;
      const user = await this.getUser(userId);
      if (user) {
        user.logRoomVisit(roomId, userId, new Date());
        user.commit();
        return;
      }
      return;
    }
    console.warn('Failed to log last room visit');
  }
  @SubscribeMessage('addUserToRoom')
  async addUserToRoom(@MessageBody('userId') userId: string, @MessageBody('roomId') roomId: string): Promise<void> {
    const user = await this.getUser(userId);
    const roomExists = await this.roomExists(roomId);
    if (user && roomExists) {
      user.inviteUserToRoom(userId, roomId);
      user.commit();
    }
  }
  @SubscribeMessage('removeUserFromRoom')
  async removeUserFromRoom(@MessageBody('userId') userId: string, @MessageBody('roomId') roomId: string) {
    const user = await this.getUser(userId);
    const roomExists = await this.roomExists(roomId);
    if (user && roomExists) {
      user.leaveRoom(roomId);
      user.commit();
    }
  }
  @SubscribeMessage('userClosedRoom')
  async userClosedRoom(
    @MessageBody('roomId') roomId: string,
    @MessageBody('userId') userId: string,
  ) {
    const user = await this.getUser(userId);
    const roomExists = await this.roomExists(roomId);
    if (user && roomExists) {
      user.logRoomVisit(roomId, userId, new Date());
      user.commit();
    }
  }
  @SubscribeMessage('createRoom')
  async createRoom(@MessageBody() roomDto: CreateRoomDto): Promise<void> {
    const user = await this.getUser(roomDto.userId);
    if (user) {
      user.createRoom(roomDto.userId, roomDto.userIds);
      user.commit();
    } else {
      throw new WsException('Cannot create Room. User does not exists');
    }
  }
  private async getUser(userId: UserId): Promise<User | undefined> {
    const result = await this.queryBus.execute(new GetUserByIdQuery(userId)) as GetUserByIdQueryResult;
    if (result.failed) console.error(result.error);
    return result.props;
  }
  private async roomExists(roomId: RoomId): Promise<boolean> {
    const result = await this.queryBus.execute(new FindRoomByIdQuery(roomId)) as FindRoomByIdQueryResult;
    return result.succeded;
  }
}
