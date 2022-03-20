import { Injectable } from "@nestjs/common";
import { CommandBus, ICommand, IEvent, ofType, Saga } from "@nestjs/cqrs";
import { CreateRoomEvent } from "@oursocial/domain";
import { map, Observable, switchMap } from "rxjs";
import { Server } from "socket.io";
import { ConnectUsersToRoomCommand } from "./commands/connect-users-to-room.command";
import { CreateRoomCommand, CreateRoomCommandResult } from "./commands/create-room.command";

@Injectable()
export class RoomsSaga {
  constructor(private commandBus: CommandBus) { }
  @Saga()
  createRoom = (event$: Observable<IEvent>): Observable<ICommand> => {
    let _userIds: string[];
    let _server: Server;
    return event$.pipe(
      ofType(CreateRoomEvent),
      switchMap(async ({ name, userIds, server }) => {
        _userIds = userIds;
        _server = server;
        return await this.commandBus.execute(new CreateRoomCommand({ name, userIds })) as CreateRoomCommandResult;
      }),
      map(result => {
        if (result.failed || !result.props) throw new Error('failed to create room');
        const { roomId } = result.props;
        return new ConnectUsersToRoomCommand(_server, _userIds, roomId);
      })
    );

  };
}
