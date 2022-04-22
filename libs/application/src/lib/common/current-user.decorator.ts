import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';

export const WsToken = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const client: Socket = ctx.switchToWs().getClient();
  const userId = client.handshake.query.token;
  return userId;
});
export const HttpToken = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const token = request.headers.authorization?.split(' ')[1];
  return token;
});
