import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { GoogleId, User } from "@oursocial/domain";
import { RoomsPersistenceService, UserPersistenceService } from "@oursocial/persistence";
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  namespace: 'active-users',
  cors: {
    origin: '*'
  }
})
export class ActiveUsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  activeUsers: Map<string, string> = new Map();
  @WebSocketServer()
  server: Server;

  constructor(private usersService: UserPersistenceService, private roomsService: RoomsPersistenceService) { }
  async handleConnection(client: Socket) {
    const googleId = client.handshake.query.googleId as string;
    const dbUser = await this.usersService.findOneByGoogleId(googleId);
    const user = User.create({ googleId: GoogleId.create({ id: dbUser.googleId }) }, dbUser._id.toString());
    await this.joinRooms(client, user.id);
    this.activeUsers.set(client.id, googleId);
    client.broadcast.emit('usersList', Array.from(this.activeUsers.values()));
  }

  handleDisconnect(client: Socket) {
    const id = client.handshake.query.id as string;
    if (id) {
      this.activeUsers.delete(client.id);
      client.broadcast.emit('usersList', Array.from(this.activeUsers.values()));
    }
  }
  private async joinRooms(client: Socket, userId: string) {
    const rooms = await this.roomsService.findByUserId(userId);
    rooms.forEach(room => client.join(room._id.toString()));
  }
}
