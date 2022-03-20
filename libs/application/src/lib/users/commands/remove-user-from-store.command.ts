import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Result, UserId } from "@oursocial/domain";
import { ActiveUsersStore } from "@oursocial/persistence";
import { Socket } from "socket.io";

export class RemoveUserFromStoreCommand {
  constructor(public readonly userId: UserId, public readonly socket: Socket) { }
}
export type RemoveUserFromStoreCommandResult = Result<{ userId: UserId; } | undefined>;
@CommandHandler(RemoveUserFromStoreCommand)
export class RemoveUserFromStoreCommandHandler implements ICommandHandler<RemoveUserFromStoreCommand>{
  constructor(private activeUsersStore: ActiveUsersStore) { }
  async execute({ userId, socket }: RemoveUserFromStoreCommand): Promise<RemoveUserFromStoreCommandResult> {
    try {
      this.activeUsersStore.removeUser(userId);
      socket.broadcast.emit('usersList', this.activeUsersStore.activeUsers);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }

  }

}
