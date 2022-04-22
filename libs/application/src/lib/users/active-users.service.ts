import { Notification, RoomId, SocketId, UserId } from '@boochat/domain';
import { QuerySocketEventsEnum } from '@boochat/shared';
import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { WsServer } from '../common';
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
  async connectUserToRoom(userId: UserId, roomId: RoomId) {
    const sockets = await WsServer.instance.fetchSockets();
    const userSocketId = this.activeUsersMap.get(userId);
    const userSocket = sockets.find((socket) => socket.id === userSocketId);
    userSocket?.join(roomId);
  }
  async disconnectUserFromRoom(userId: UserId, roomId: RoomId) {
    const sockets = await WsServer.instance.fetchSockets();
    const userSocketId = this.activeUsersMap.get(userId);
    const userSocket = sockets.find((socket) => socket.id === userSocketId);
    userSocket?.leave(roomId);
  }
  async notifyUser(userId: UserId, notification: Notification) {
    const socket = await this.findUserSocket(userId);
    socket?.emit(QuerySocketEventsEnum.NOTIFICATION, notification);
  }
}
