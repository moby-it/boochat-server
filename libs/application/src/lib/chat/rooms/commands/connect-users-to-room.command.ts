import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Result, RoomId, UserId } from "@oursocial/domain";
import { ActiveUsersStore } from "@oursocial/persistence";
import { WsServer } from "../../../common";
export class ConnectUsersToRoomCommand {
  constructor(public readonly userIds: UserId[], public readonly roomId: RoomId) { }
}
export type ConnectUsersToRoomResult = Result;
@CommandHandler(ConnectUsersToRoomCommand)
export class ConnectUsersToRoomCommandHandler implements ICommandHandler<ConnectUsersToRoomCommand> {

  constructor(private activeUsersStore: ActiveUsersStore) { }
  async execute(command: ConnectUsersToRoomCommand): Promise<ConnectUsersToRoomResult> {
    const server = WsServer.instance;
    const { userIds, roomId } = command;
    try {
      const allSockets = await server.fetchSockets();
      const participantsSocketIds = this.activeUsersStore.findSockets(userIds);
      const sockets = allSockets.filter(socket => participantsSocketIds.includes(socket.id));
      sockets.forEach(socket => socket.join(roomId));
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }

  }

}
