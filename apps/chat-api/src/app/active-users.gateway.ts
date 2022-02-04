import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "net";

@WebSocketGateway(4000, {
  namespace: 'chat',
  cors: {
    origin: '*'
  }
})
export class ActiveUsersGateway {

  @SubscribeMessage('userOnline')
  onUserOnline(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    this.turnUserOnline();
    client.on('close', () => {
      this.turnUserOffine();
    });
  }

  private turnUserOnline() {
    console.log('user turned online');
  }

  private turnUserOffine() {
    console.log('user turned offline');
  }
}
