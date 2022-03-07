import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
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

  handleConnection(client: Socket) {
    const email = client.handshake.query.email as string;
    if (email) {
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
