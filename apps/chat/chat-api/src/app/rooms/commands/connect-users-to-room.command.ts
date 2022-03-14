import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Result, RoomId, UserId } from "@oursocial/domain";
import { Server } from "socket.io";
import { ActiveUsersStore } from "@oursocial/persistence";
export class ConnectUsersToRoomCommand {
  constructor(public readonly server: Server, public readonly userIds: UserId[], public readonly roomId: RoomId) { }
}
export type ConnectUsersToRoomResult = Result<undefined>;
@CommandHandler(ConnectUsersToRoomCommand)
export class ConnectUsersToRoomCommandHandler implements ICommandHandler<ConnectUsersToRoomCommand> {

  constructor(private activeUsersStore: ActiveUsersStore) { }
  async execute(command: ConnectUsersToRoomCommand): Promise<ConnectUsersToRoomResult> {
    const { server, userIds, roomId } = command;
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
