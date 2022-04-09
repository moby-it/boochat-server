import { SocketId, UserId } from '@boochat/domain';
import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ActiveUsersStoreService {
  private _activeUsers$: BehaviorSubject<Map<UserId, SocketId>> = new BehaviorSubject(new Map());
  public activeUsers$ = this._activeUsers$.asObservable();
  get activeUsersMap() {
    return this._activeUsers$.getValue();
  }
  get activeUsers() {
    return Array.from(this._activeUsers$.getValue().keys());
  }
  userConnected(googleId: string, socketId: SocketId) {
    this._activeUsers$.next(this.activeUsersMap.set(googleId, socketId));
  }
  userDisconnected(googleId: string) {
    const activeUsers = this.activeUsersMap;
    activeUsers.delete(googleId);
    this._activeUsers$.next(activeUsers);
  }
  findSockets(googleIds: string[]): SocketId[] {
    const socketIds = [];
    for (const [googleId, socketId] of this.activeUsersMap) {
      if (googleIds.includes(googleId)) socketIds.push(socketId);
    }
    return socketIds;
  }
}
