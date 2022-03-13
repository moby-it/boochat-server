import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Result } from "@oursocial/domain";
import { RoomsPersistenceService } from "@oursocial/persistence";

export class RemoveUserFromRoomCommand {
  constructor(public readonly userId: string, public readonly roomId: string) { }
}
export type RemoveUserFromRoomCommandResult = Result<undefined>;

@CommandHandler(RemoveUserFromRoomCommand)
export class RemoveUserFromRoomCommandHandler implements ICommandHandler<RemoveUserFromRoomCommand> {
  constructor(private roomsService: RoomsPersistenceService) { }

  async execute(command: RemoveUserFromRoomCommand): Promise<any> {
    const { userId, roomId } = command;
    return await this.roomsService.removeUserFromRoom(userId, roomId);
  }

}
