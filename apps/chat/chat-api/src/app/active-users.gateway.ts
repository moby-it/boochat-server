import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: '*'
  }
})
export class ActiveUsersGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer()
  server!: Server;

  handleConnection(client: Socket) {
    const email = client.handshake.query.email as string;
    if (email)
      client.broadcast.emit('userOnline', {email});
  }

  handleDisconnect(client: Socket) {
    const email = client.handshake.query.email as string;
    if (email)
      client.broadcast.emit('userOffline', {email});
  }

}
