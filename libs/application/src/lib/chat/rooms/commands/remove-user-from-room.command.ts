import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Result } from "@oursocial/domain";
import { RoomsPersistenceService } from "@oursocial/persistence";

export class RemoveUserFromRoomCommand {
  constructor(public readonly userId: string, public readonly roomId: string) { }
}
export type RemoveUserFromRoomCommandResult = Result;

@CommandHandler(RemoveUserFromRoomCommand)
export class RemoveUserFromRoomCommandHandler implements ICommandHandler<RemoveUserFromRoomCommand> {
  constructor(private roomsService: RoomsPersistenceService) { }

  async execute(command: RemoveUserFromRoomCommand): Promise<RemoveUserFromRoomCommandResult> {
    const { userId, roomId } = command;
    try {
      await this.roomsService.removeUserFromRoom(userId, roomId);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }

}
