import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { RoomsPersistenceService, UserPersistenceService } from "@oursocial/persistence";
import { Server, Socket } from 'socket.io';
import { ActiveUsersService } from "./active-users.service";
@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ActiveUsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(private usersService: UserPersistenceService, private roomsService: RoomsPersistenceService, private activeUsersService: ActiveUsersService) { }
  async handleConnection(client: Socket) {
    const googleId = client.handshake.query.googleId as string;
    const dbUser = await this.usersService.findOneByGoogleId(googleId);
    if (!dbUser) throw new Error('User Not Found!');
    const userId: string = dbUser._id.toString();
    this.activeUsersService.addUser(userId, client.id);
    await this.joinRooms(client, userId);
    client.broadcast.emit('usersList', this.activeUsersService.activeUsers);
  }

  handleDisconnect(client: Socket) {
    const googleId = client.handshake.query.googleId as string;
    if (googleId) {
      this.activeUsersService.removeUser(googleId);
      client.broadcast.emit('usersList', this.activeUsersService.activeUsers);
    }
  }
  private async joinRooms(client: Socket, userId: string) {
    const rooms = await this.roomsService.findByUserId(userId);
    rooms.forEach(room => client.join(room._id.toString()));
  }
}
