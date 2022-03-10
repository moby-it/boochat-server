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
  addUser(googleId: string, socketId: SocketId) {
    this._activeUsers$.next(this.activeUsersMap.set(googleId, socketId));
  }
  removeUser(googleId: string) {
    const activeUsers = this.activeUsersMap;
    activeUsers.delete(googleId);
    this._activeUsers$.next(activeUsers);
  }
  findSockets(googleIds: string[]): SocketId[] {
    const socketIds = [];
    for (let [googleId, socketId] of this.activeUsersMap) {
      if (googleIds.includes(googleId)) socketIds.push(socketId);
    }
    return socketIds;
  }
}
