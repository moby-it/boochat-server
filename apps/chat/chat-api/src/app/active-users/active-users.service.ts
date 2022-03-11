import { Injectable } from "@nestjs/common";
import { BehaviorSubject } from "rxjs";
type SocketId = string;

@Injectable()
export class ActiveUsersService {

  private _activeUsers$: BehaviorSubject<Map<string, SocketId>> = new BehaviorSubject(new Map());
  public activeUsers$ = this._activeUsers$.asObservable();
  get activeUsersMap() {
    return this._activeUsers$.getValue();
  }
  get activeUsers() {
    return Array.from(this._activeUsers$.getValue().keys());
  }
  addUser(userId: string, socketId: SocketId) {
    this._activeUsers$.next(this.activeUsersMap.set(userId, socketId));
  }
  removeUser(userId: string) {
    const activeUsers = this.activeUsersMap;
    activeUsers.delete(userId);
    this._activeUsers$.next(activeUsers);
  }
  findSockets(userIds: string[]): SocketId[] {
    const socketIds = [];
    for (let [userId, socketId] of this.activeUsersMap) {
      if (userIds.includes(userId)) socketIds.push(socketId);
    }
    return socketIds;
  }
}
