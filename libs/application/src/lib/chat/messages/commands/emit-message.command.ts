import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Message, Result } from "@oursocial/domain";
import { instanceToPlain } from "class-transformer";
import { WsServer } from "../../../common";
export class EmitMessageCommand {
  constructor(public message: Message) { };
}
export type EmitMessageCommandResult = Result<Message | undefined>;
@CommandHandler(EmitMessageCommand)
export class EmitMessageCommandHandler implements ICommandHandler<EmitMessageCommand> {
  async execute(command: EmitMessageCommand): Promise<EmitMessageCommandResult> {
    try {
      const { message } = command;
      const response = instanceToPlain(message, { excludePrefixes: ['_'] });
      WsServer.instance.to(message.room.id).emit('receiveMessage', response);
      return Result.success(message);
    } catch (e) {
      return Result.fail(e);
    }

  }

}
