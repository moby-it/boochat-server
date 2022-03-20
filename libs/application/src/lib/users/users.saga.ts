import { Injectable } from "@nestjs/common";
import { CommandBus, ICommand, IEvent, ofType, Saga } from "@nestjs/cqrs";
import { UserConnectedEvent, UserDisconnectedEvent } from "@oursocial/domain";
import { ActiveUsersStore } from "@oursocial/persistence";
import { catchError, EMPTY, map, Observable, switchMap, tap } from "rxjs";
import { Socket } from "socket.io";
import { AddUserToStoreCommand, AddUserToStoreCommandResult } from "./commands/add-user-to-store.command";
import { RemoveUserFromStoreCommand } from "./commands/remove-user-from-store.command";
import { UserJoinsRoomCommand } from "./commands/user-joins-rooms.command";

@Injectable()
export class UsersSaga {
  constructor(private commandBus: CommandBus, private activeUsersStore: ActiveUsersStore) { }
  @Saga()
  userConnected = (events$: Observable<IEvent>): Observable<ICommand> => {
    let _socket: Socket | undefined;
    return events$.pipe(
      ofType(UserConnectedEvent),
      switchMap(async ({ user, socket }) => {
        _socket = socket;
        return await this.commandBus.execute(new AddUserToStoreCommand(user.googleId, socket)) as AddUserToStoreCommandResult;
      }),
      map(result => {
        if (result.failed || !result.props || !_socket) throw result.error;
        return new UserJoinsRoomCommand(_socket, result.props.userId);
      }),
      tap(() => {
        if (!_socket) throw new Error('no socket found');
        _socket.broadcast.emit('usersList', this.activeUsersStore.activeUsers);
      }),
      catchError(error => {
        if (_socket) {
          _socket.disconnect();
          _socket = undefined;
        }
        console.error(error);
        return EMPTY;
      })
    );
  };
  @Saga()
  userDisconnected = (events$: Observable<IEvent>): Observable<ICommand> => {
    return events$.pipe(
      ofType(UserDisconnectedEvent),
      map(({ user, socket }) => {
        return new RemoveUserFromStoreCommand(user.id, socket);
      }),
      catchError(error => {
        console.error(error);
        return EMPTY;
      })
    );
  };
}
