import { Injectable } from "@nestjs/common";
import { CommandBus, ICommand, IEvent, ofType, Saga } from "@nestjs/cqrs";
import { CreateRoomEvent, InviteUserToRoomEvent, LeaveRoomEvent, LogVisitEvent } from "@oursocial/domain";
import { map, Observable, switchMap } from "rxjs";
import { AddUserToRoomCommand, DisconnectUsersFromRoomCommand, RemoveUserFromRoomCommand, SaveUserLastRoomVisitCommand } from "./commands";
import { ConnectUsersToRoomCommand } from "./commands/connect-users-to-room.command";
import { CreateRoomCommand, CreateRoomCommandResult } from "./commands/create-room.command";

@Injectable()
export class RoomsSaga {
  constructor(private commandBus: CommandBus) { }
  @Saga()
  createRoom = (events$: Observable<IEvent>): Observable<ICommand> => {
    let _userIds: string[];
    return events$.pipe(
      ofType(CreateRoomEvent),
      switchMap(async ({ name, userIds }) => {
        _userIds = userIds;
        return await this.commandBus.execute(new CreateRoomCommand({ name, userIds })) as CreateRoomCommandResult;
      }),
      map(result => {
        if (result.failed || !result.props) throw new Error('failed to create room');
        const room = result.props;
        return new ConnectUsersToRoomCommand(_userIds, room.id);
      })
    );
  };
  @Saga()
  inviteUserToRoom = (events$: Observable<IEvent>): Observable<ICommand> => events$.pipe(
    ofType(InviteUserToRoomEvent),
    switchMap(event => [
      new AddUserToRoomCommand(event.userId, event.roomId),
      new ConnectUsersToRoomCommand([event.userId], event.roomId)
    ])
  );
  @Saga()
  removeUserFromRoom = (events$: Observable<IEvent>): Observable<ICommand> => events$.pipe(
    ofType(LeaveRoomEvent),
    switchMap(event => [
      new RemoveUserFromRoomCommand(event.userId, event.roomId),
      new DisconnectUsersFromRoomCommand([event.userId], event.roomId)
    ])
  );
  @Saga()
  logVisit = (event$: Observable<IEvent>): Observable<ICommand> => event$.pipe(
    ofType(LogVisitEvent),
    map(event => new SaveUserLastRoomVisitCommand(event.roomId, event.userId, event.timestamp))
  );
}
