import { ActiveUsersService, WebsocketEventsEnum, WsServer } from '@boochat/application';
import { UserConnectedEvent, UserId } from '@boochat/domain';
import { EventBus } from '@nestjs/cqrs';
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
  constructor(private activeUsersService: ActiveUsersService, private eventBus: EventBus) {}
  handleDisconnect(socket: Socket) {
    const userId = socket.handshake.query['id'] as UserId;
    this.activeUsersService.remove(userId);
    console.log('Disconnected');
  }
  handleConnection(socket: Socket) {
    if (!this.serverInitialized) {
      this.setStaticWsServer();
      this.setUserListWsSubscription();
    }
    const userId = socket.handshake.query['id'] as UserId;
    if (!userId) throw new WsException('cannot connect without a user id');
    this.activeUsersService.add(userId, socket.id);
    this.eventBus.publish(new UserConnectedEvent(userId, socket));
    console.log('Connected', userId);
  }
  private setStaticWsServer() {
    this.serverInitialized = true;
    WsServer.instance = this.server;
  }
  private setUserListWsSubscription() {
    this.activeUsersService.activeUsers$.pipe(debounceTime(500)).subscribe((userList) => {
      WsServer.instance.emit(WebsocketEventsEnum.USER_LIST, Array.from(userList.keys()));
    });
  }
}
