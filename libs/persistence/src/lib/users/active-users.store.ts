import { Injectable } from "@nestjs/common";
import { SocketId, UserId } from "@oursocial/domain";
import { BehaviorSubject } from "rxjs";

export type ActiveUsersMap = Map<UserId, SocketId>;
@Injectable()
export class ActiveUsersStore {

  private _activeUsers$: BehaviorSubject<ActiveUsersMap> = new BehaviorSubject(new Map());
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
    for (const [userId, socketId] of this.activeUsersMap) {
      if (userIds.includes(userId)) socketIds.push(socketId);
    }
    return socketIds;
  }
}
