import { Injectable } from '@nestjs/common';
import { BehaviorSubject, map, Observable } from "rxjs";
import { ActiveUser } from "@pokedexe/application";
import '@pokedexe/utilities';

@Injectable()
export class ActiveUsersService {

  private _activeUsers$: BehaviorSubject<ActiveUser[]> = new BehaviorSubject<ActiveUser[]>([]);
  public activeUsers: Observable<string[]> = this._activeUsers$.asObservable()
    .pipe(map(users => {
        const uniqueEmails = users.filterByUniqueValues<ActiveUser, string>('email') as string[];
        console.log(uniqueEmails);
        return uniqueEmails;
      }
    ));

  addUser(email: string, socketId: string) {
    const newUsers: ActiveUser[] = [...this._activeUsers$.getValue(), {socketId, email}];
    this._activeUsers$.next(newUsers);
  }

  removeUser(socketId: string) {
    const newUsers: ActiveUser[] = this._activeUsers$.getValue().filter(u => u.socketId !== socketId);
    this._activeUsers$.next(newUsers);
  }

}
