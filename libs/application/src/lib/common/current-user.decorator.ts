import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';

export const Token = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const client: Socket = ctx.switchToWs().getClient();
  const userId = client.handshake.headers.authorization;
  return userId;
});
