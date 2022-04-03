import { GetUserByIdQuery, GetUserByIdQueryResult } from '@boochat/application';
import { User, UserId } from '@boochat/domain';
import { QueryBus } from '@nestjs/cqrs';
import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
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
      if (user) {
        user.closedRoom(userId, roomId, new Date());
        user.cameOffline();
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
    if (user) {
      user.inviteUserToRoom(userId, roomId);
      user.commit();
    }
  }
  @SubscribeMessage('removeUserFromRoom')
  async removeUserFromRoom(@MessageBody('userId') userId: string, @MessageBody('roomId') roomId: string) {
    const user = await this.getUser(userId);
    if (user) {
      user.leaveRoom(roomId);
      user.commit();
    }
  }
  @SubscribeMessage('userClosedRoom')
  async userClosedRoom(@MessageBody('roomId') roomId: string, @MessageBody('userId') userId: string) {
    const user = await this.getUser(userId);
    if (user) {
      user.closedRoom(userId, roomId, new Date());
      user.commit();
    }
  }
  private async getUser(userId: UserId): Promise<User | undefined> {
    const result = (await this.queryBus.execute(new GetUserByIdQuery(userId))) as GetUserByIdQueryResult;
    if (result.failed) console.error(result.error);
    return result.props;
  }
}
