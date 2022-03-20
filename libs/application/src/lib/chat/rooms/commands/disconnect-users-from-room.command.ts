import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Result, RoomId, UserId } from "@oursocial/domain";
import { ActiveUsersStore } from "@oursocial/persistence";
import { WsServer } from "../../../common";

export class DisconnectUsersFromRoomCommand {
  constructor(public readonly userIds: UserId[], public readonly roomId: RoomId) { }
}
export type DisconnectUsersFromRoomResult = Result;
@CommandHandler(DisconnectUsersFromRoomCommand)
export class DisconnectUsersFromRoomCommandHandler implements ICommandHandler<DisconnectUsersFromRoomCommand> {

  constructor(private activeUsersStore: ActiveUsersStore) { }
  async execute(command: DisconnectUsersFromRoomCommand): Promise<DisconnectUsersFromRoomResult> {
    const { userIds, roomId } = command;
    const server = WsServer.instance;
    try {
      const allSockets = await server.fetchSockets();
      const participantsSocketIds = this.activeUsersStore.findSockets(userIds);
      const sockets = allSockets.filter(socket => participantsSocketIds.includes(socket.id));
      sockets.forEach(socket => socket.leave(roomId));
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }

  }

}
