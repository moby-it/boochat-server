import { GoogleId, Notification, RoomId, SocketId } from '@boochat/domain';
import { QuerySocketEventsEnum } from '@boochat/shared';
import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { WsServer } from '../common';
export type ActiveUsersMap = Map<GoogleId, SocketId>;

@Injectable()
export class ActiveUsersService {
  public userRoomsMap: Map<GoogleId, RoomId> = new Map();
  private _activeUsers$: BehaviorSubject<ActiveUsersMap> = new BehaviorSubject(new Map<GoogleId, SocketId>());
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
  get activeUserIds() {
    return Array.from(this.activeUsersMap.keys());
  }
  add(userId: GoogleId, socketId: SocketId) {
    this._activeUsers$.next(this.activeUsersMap.set(userId, socketId));
  }
  remove(userId: string) {
    const activeUsers = this.activeUsersMap;
    activeUsers.delete(userId);
    this._activeUsers$.next(activeUsers);
  }

  private async findUserSocket(userId: string) {
    const sockets = await WsServer.instance.fetchSockets();
    const userSocketId = this.activeUsersMap.get(userId);
    const userSocket = sockets.find((socket) => socket.id === userSocketId);
    return userSocket;
  }

  async connectUserToRoom(userId: GoogleId, roomId: RoomId) {
    const sockets = await WsServer.instance.fetchSockets();
    const userSocketId = this.activeUsersMap.get(userId);
    const userSocket = sockets.find((socket) => socket.id === userSocketId);
    userSocket?.join(roomId);
  }
  async disconnectUserFromRoom(userId: GoogleId, roomId: RoomId) {
    const sockets = await WsServer.instance.fetchSockets();
    const userSocketId = this.activeUsersMap.get(userId);
    const userSocket = sockets.find((socket) => socket.id === userSocketId);
    userSocket?.leave(roomId);
  }
  async notifyUser(userId: GoogleId, notification: Notification) {
    const socket = await this.findUserSocket(userId);
    if (socket) {
      socket?.emit(QuerySocketEventsEnum.NOTIFICATION, notification);
    }
  }
}
