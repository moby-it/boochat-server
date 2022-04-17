import { AuthService } from '@boochat/application';
import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class AuthGateway implements OnGatewayConnection {
  constructor(private authService: AuthService) {}
  async handleConnection(client: Socket) {
    const token = client.handshake.headers['authorization'] as string;
    const result = await this.authService.verify(token);
    if (!result) {
      console.error(`client with token ${token} failed to authenticate`);
      client.disconnect(true);
    } else {
      console.log('client authenticated');
    }
  }
}
