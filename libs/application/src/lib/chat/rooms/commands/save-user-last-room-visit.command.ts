import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Result, UserId } from "@oursocial/domain";
import { EventLogPersistenceService } from "@oursocial/persistence";

export class SaveUserLastRoomVisitCommand {
  constructor(public readonly roomId: string, public readonly userId: UserId, public readonly timestamp: Date) { }
}
export type SaveUserLastRoomVisitResult = Result;
@CommandHandler(SaveUserLastRoomVisitCommand)
export class SaveUserLastRoomVisitCommandHandler implements ICommandHandler<SaveUserLastRoomVisitCommand> {
  constructor(private eventLogService: EventLogPersistenceService) { }
  async execute(command: SaveUserLastRoomVisitCommand): Promise<Result> {
    const { roomId, userId, timestamp } = command;
    try {
      await this.eventLogService.logVisit(roomId, userId, timestamp);
      return Result.success();
    } catch (e) {
      console.error(e);
      return Result.fail(e);
    }
  }
}
