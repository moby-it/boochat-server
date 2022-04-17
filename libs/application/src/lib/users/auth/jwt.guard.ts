import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      const token = client.handshake?.headers?.authorization as string;
      const isAuthenticated = await this.authService.verify(token);
      if (!isAuthenticated) client.disconnect();
      return isAuthenticated;
    } catch (err) {
      console.error(err);
      throw new WsException('failed to authenticate');
    }
  }
}
