import { CommandBus } from "@nestjs/cqrs";
import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { CreaterMessageCommand, CreateRoomCommandResult, WsServer } from "@oursocial/application";
import { MessageDto } from "@oursocial/persistence";
import { instanceToPlain } from "class-transformer";

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessageGateway {
  constructor(private commandBus: CommandBus) { }
  @SubscribeMessage('sendMessage')
  async onNewMessage(@MessageBody() newMessage: MessageDto) {
    const createMesageResult = await this.commandBus.
      execute(new CreaterMessageCommand(newMessage)) as CreateRoomCommandResult;
    if (createMesageResult.failed)
      throw createMesageResult.error;
    const response = instanceToPlain(createMesageResult.props, { excludePrefixes: ['_'] });
    WsServer.instance.to(newMessage.roomId).emit('receiveMessage', response);
  }
}
