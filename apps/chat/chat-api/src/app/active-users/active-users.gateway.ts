import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { UserPersistenceService } from "@oursocial/persistence";
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
  server!: Server;
  constructor(private usersService: UserPersistenceService) { }
  async handleConnection(client: Socket) {
    const email = client.handshake.query.email as string;
    if (email) {
      const exists = await this.usersService.exists(email);
      if (!exists) {
        await this.usersService.create({ email });
      }
      this.activeUsers.set(client.id, email);
      client.broadcast.emit('usersList', Array.from(this.activeUsers.values()));
    }
  }

  handleDisconnect(client: Socket) {
    const email = client.handshake.query.email as string;
    if (email) {
      this.activeUsers.delete(client.id);
      client.broadcast.emit('usersList', Array.from(this.activeUsers.values()));
    }
  }

}
