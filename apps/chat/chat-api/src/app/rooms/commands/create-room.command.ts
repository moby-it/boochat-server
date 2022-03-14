import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Result, RoomId } from "@oursocial/domain";
import { RoomDto, RoomsPersistenceService } from "@oursocial/persistence";

export class CreateRoomCommand {
  constructor(public readonly roomDto: RoomDto) { }
}
export type CreateRoomCommandResult = Result<{ roomId: RoomId; } | undefined>;
@CommandHandler(CreateRoomCommand)
export class CreateRoomCommandHandler implements ICommandHandler<CreateRoomCommand> {
  constructor(private roomsService: RoomsPersistenceService) { }
  async execute(command: CreateRoomCommand): Promise<CreateRoomCommandResult> {
    try {
      const { name, userIds } = command.roomDto;
      const room = await this.roomsService.createRoom({ name, userIds });
      return Result.success({ roomId: room.id });
    } catch (e) {
      return Result.fail(e);
    }

  }

}
