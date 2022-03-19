import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Result, UserId } from "@oursocial/domain";
import { UserRoomVisitPersistenceService } from "@oursocial/persistence";

export class SaveUserLastRoomVisitCommand {
  constructor(public readonly roomId: string, public readonly userId: UserId, public readonly timestamp: Date) { }
}
export type SaveUserLastRoomVisitResult = Result;
@CommandHandler(SaveUserLastRoomVisitCommand)
export class SaveUserLastRoomVisitCommandHandler implements ICommandHandler<SaveUserLastRoomVisitCommand> {
  constructor(private userRoomVisitService: UserRoomVisitPersistenceService) { }
  async execute(command: SaveUserLastRoomVisitCommand): Promise<Result> {
    const { roomId, userId, timestamp } = command;
    try {
      await this.userRoomVisitService.logVisit(roomId, userId, timestamp);
      return Result.success();
    } catch (e) {
      return Result.fail(e);
    }
  }
}
