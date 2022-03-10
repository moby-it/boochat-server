import { Injectable } from "@nestjs/common";
import { GoogleId } from "@oursocial/domain";
import { BehaviorSubject } from "rxjs";
type SocketId = string;

@Injectable()
export class ActiveUsersService {

  private _activeUsers$: BehaviorSubject<Map<GoogleId, SocketId>> = new BehaviorSubject(new Map());
  public activeUsers$ = this._activeUsers$.asObservable();
  get activeUsers() {
    return this._activeUsers$.getValue();
  }
  addUser(googleId: GoogleId, socketId: SocketId) {
    this._activeUsers$.next(this.activeUsers.set(googleId, socketId));
  }
  removeUser(googleId: GoogleId) {
    const activeUsers = this.activeUsers;
    activeUsers.delete(googleId);
    this._activeUsers$.next(activeUsers);
  }
  findSocket(googleIds: GoogleId[]): SocketId[] {
    const socketIds = [];
    for (let [googleId, socketId] of this.activeUsers) {
      if (googleIds.includes(googleId)) socketIds.push(socketId);
    }
    return socketIds;
  }
}
