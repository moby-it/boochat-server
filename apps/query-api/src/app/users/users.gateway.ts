import { WsServer } from '@boochat/application';
import { UserId } from '@boochat/domain';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { debounceTime } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { ActiveUsersService } from './active-users.service';
@WebSocketGateway()
export class UsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  serverInitialized = false;
  @WebSocketServer()
  server!: Server;
  constructor(private activeUsersService: ActiveUsersService) {}
  handleDisconnect(socket: Socket) {
    const userId = socket.handshake.query['id'] as UserId;
    this.activeUsersService.removeUser(userId);
    console.log('Disconnected');
  }
  handleConnection(socket: Socket) {
    if (!this.serverInitialized) {
      this.initializeWsServer();
    }
    const userId = socket.handshake.query['id'] as UserId;
    this.activeUsersService.addUser(userId, socket.id);
    console.log('Connected', userId);
  }
  private initializeWsServer() {
    this.serverInitialized = true;
    WsServer.instance = this.server;
    this.activeUsersService.activeUsers$.pipe(debounceTime(500)).subscribe((userList) => {
      WsServer.instance.emit('usersList', Array.from(userList.keys()));
    });
  }
}
