import { WsServer } from '@boochat/application';
import { RoomId, SocketId, UserId } from '@boochat/domain';
import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { WebsocketEventsEnum } from '../common';
export type ActiveUsersMap = Map<UserId, SocketId>;

@Injectable()
export class ActiveUsersService {
  private _activeUsers$: BehaviorSubject<ActiveUsersMap> = new BehaviorSubject(new Map<UserId, SocketId>());
  public activeUsers$ = this._activeUsers$.asObservable();
  get activeUsersMap() {
    return this._activeUsers$.getValue();
  }
  get activeUsers() {
    return Array.from(this._activeUsers$.getValue().keys());
  }
  get activeUserSocketIds() {
    return Array.from(this.activeUsersMap.values());
  }
  add(userId: UserId, socketId: SocketId) {
    this._activeUsers$.next(this.activeUsersMap.set(userId, socketId));
    WsServer.instance.emit(WebsocketEventsEnum.USER_LIST, this.activeUsers);
  }
  remove(userId: string) {
    const activeUsers = this.activeUsersMap;
    activeUsers.delete(userId);
    this._activeUsers$.next(activeUsers);
  }
  private findSockets(userIds: string[]): SocketId[] {
    const socketIds = [];
    for (const [userId, socketId] of this.activeUsersMap) {
      if (userIds.includes(userId)) socketIds.push(socketId);
    }
    return socketIds;
  }
  async connectUserToRoom(userId: UserId, roomId: RoomId) {
    const sockets = await WsServer.instance.fetchSockets();
    const userSocketId = this.activeUsersMap.get(userId);
    const userSocket = sockets.find((socket) => socket.id === userSocketId);
    userSocket?.join(roomId);
  }
}
