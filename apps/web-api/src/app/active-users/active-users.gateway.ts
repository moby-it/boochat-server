import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import {
  GetUserByGoogleIdQuery,
  GetUserByGoogleIdQueryResult,
  WsServer,
} from '@boochat/application';
import { Server, Socket } from 'socket.io';
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ActiveUsersGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}
  async handleConnection(socket: Socket) {
    WsServer.instance = this.server;
    const googleId = socket.handshake.query.googleId as string;
    const result = (await this.queryBus.execute(
      new GetUserByGoogleIdQuery(googleId)
    )) as GetUserByGoogleIdQueryResult;
    if (result.succeded && result.props) {
      const user = result.props;
      user.cameOnline(user, socket);
      user.commit();
    }
  }

  async handleDisconnect(socket: Socket) {
    const googleId = socket.handshake.query.googleId as string;
    const result = (await this.queryBus.execute(
      new GetUserByGoogleIdQuery(googleId)
    )) as GetUserByGoogleIdQueryResult;
    if (result.succeded && result.props) {
      const user = result.props;
      user.cameOffline(user, socket);
      user.commit();
    }
  }
}
