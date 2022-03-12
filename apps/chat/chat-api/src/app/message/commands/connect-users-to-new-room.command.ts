import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Result, RoomId, UserId } from "@oursocial/domain";
import { Server } from "socket.io";
import { ActiveUsersStore } from "../../active-users/active-users.store";

export class ConnectUsersToNewRoomCommand {
  constructor(public readonly server: Server, public readonly userIds: UserId[], public readonly roomId: RoomId) { }
}
export type ConnectUsersToNewRoomResult = Result<undefined>;
@CommandHandler(ConnectUsersToNewRoomCommand)
export class ConnectUsersToNewRoomCommandHandler implements ICommandHandler<ConnectUsersToNewRoomCommand> {
  constructor(private activeUsersStore: ActiveUsersStore) { }
  async execute(command: ConnectUsersToNewRoomCommand): Promise<ConnectUsersToNewRoomResult> {
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
