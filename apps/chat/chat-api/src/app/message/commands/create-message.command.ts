import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Message, Result } from "@oursocial/domain";
import { MessageDto, MessagePersistenceService } from "@oursocial/persistence";
import { dbMessageToMessage } from "../../common";
export class CreaterMessageCommand {
  constructor(public newMessage: MessageDto) { };
}
export type CreateMessageCommandResult = Result<Message | undefined>;
@CommandHandler(CreaterMessageCommand)
export class CreaterMessageCommandHandler implements ICommandHandler<CreaterMessageCommand> {
  constructor(private messageService: MessagePersistenceService) { }
  async execute(command: CreaterMessageCommand): Promise<CreateMessageCommandResult> {
    try {
      const { newMessage } = command;
      const dbMessage = await this.messageService.create(newMessage);
      const populatedMessage = await this.messageService.populateMessage(dbMessage);
      const message = dbMessageToMessage(populatedMessage);
      return Result.success(message);
    } catch (e) {
      return Result.fail(e);
    }

  }

}
