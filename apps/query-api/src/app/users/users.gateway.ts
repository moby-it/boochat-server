import {
  ActiveUsersService,
  GetUserByIdQuery,
  GetUserByIdQueryResult,
  WebsocketEventsEnum,
  WsServer
} from '@boochat/application';
import { UserConnectedEvent, UserId } from '@boochat/domain';
import { EventBus, QueryBus } from '@nestjs/cqrs';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
  WsException
} from '@nestjs/websockets';
import { debounceTime } from 'rxjs';
import { Server, Socket } from 'socket.io';
@WebSocketGateway()
export class UsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  serverInitialized = false;
  @WebSocketServer()
  server!: Server;
  constructor(
    private activeUsersService: ActiveUsersService,
    private eventBus: EventBus,
    private queryBus: QueryBus
  ) {}
  handleDisconnect(socket: Socket) {
    const userId = socket.handshake.query['id'] as UserId;
    this.activeUsersService.remove(userId);
    console.log('Disconnected');
  }
  async handleConnection(socket: Socket) {
    if (!this.serverInitialized) {
      this.setStaticWsServer();
      this.setUserListWsSubscription();
    }
    const userId = socket.handshake.query['id'] as UserId;
    if (!userId) throw new WsException('cannot connect without a user id');
    if (await this.userExists(userId)) {
      this.activeUsersService.add(userId, socket.id);
      this.eventBus.publish(new UserConnectedEvent(userId, socket));
      console.log('Connected', userId);
    }
  }
  private setStaticWsServer() {
    this.serverInitialized = true;
    WsServer.instance = this.server;
  }
  private setUserListWsSubscription() {
    this.activeUsersService.activeUsers$.pipe(debounceTime(500)).subscribe((userList) => {
      WsServer.instance.emit(WebsocketEventsEnum.ACTIVE_USER_LIST, Array.from(userList.keys()));
    });
  }
  private async userExists(userId: UserId): Promise<boolean> {
    const result = (await this.queryBus.execute(new GetUserByIdQuery(userId))) as GetUserByIdQueryResult;
    if (result.failed) throw new WsException('failed to get user');
    return true;
  }
}
