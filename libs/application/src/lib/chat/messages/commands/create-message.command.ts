import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Message, Result } from "@oursocial/domain";
import { MessageDto, MessagePersistenceService } from "@oursocial/persistence";
import { MessageDtoToMessage } from "../message.mappings";
export class CreateMessageCommand {
  constructor(public newMessage: MessageDto) { };
}
export type CreateMessageCommandResult = Result<Message | undefined>;
@CommandHandler(CreateMessageCommand)
export class CreateMessageCommandHandler implements ICommandHandler<CreateMessageCommand> {
  constructor(private messageService: MessagePersistenceService) { }
  async execute(command: CreateMessageCommand): Promise<CreateMessageCommandResult> {
    try {
      const { newMessage } = command;
      const dbMessage = await this.messageService.create(newMessage);
      const result = await this.messageService.populateMessage(dbMessage);
      if (result.failed || !result.props) throw result.error;
      const message = MessageDtoToMessage(result.props);
      return Result.success(message);
    } catch (e) {
      return Result.fail(e);
    }

  }

}
