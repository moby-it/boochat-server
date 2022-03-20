import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Result } from "@oursocial/domain";
import { RoomsPersistenceService } from "@oursocial/persistence";

export class AddUserToRoomCommand {
  constructor(public readonly userId: string, public readonly roomId: string) { }
}
export type AddUserToRoomCommandResult = Result;

@CommandHandler(AddUserToRoomCommand)
export class AddUserToRoomCommandHandler implements ICommandHandler<AddUserToRoomCommand> {
  constructor(private roomsService: RoomsPersistenceService) { }
  async execute(command: AddUserToRoomCommand): Promise<AddUserToRoomCommandResult> {
    const { userId, roomId } = command;
    try {
      await this.roomsService.addUserToRoom(userId, roomId);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }

  }

}
