import { AuthService, SendMessageCommand, WsToken, WsJwtGuard } from '@boochat/application';
import { CreateMessageDto, Result } from '@boochat/domain';
import { CommandSocketEventsEnum } from '@boochat/shared';
import { UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { MessageBody, SubscribeMessage, WebSocketGateway, WsException } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
@UseGuards(WsJwtGuard)
export class MessageGateway {
  constructor(private commandBus: CommandBus, private authService: AuthService) {}
  @SubscribeMessage(CommandSocketEventsEnum.SEND_MESSAGE)
  async onNewMessage(@WsToken() token: string, @MessageBody() newMessageEvent: CreateMessageDto) {
    const senderId = await this.authService.getUserId(token);
    const { content, roomId } = newMessageEvent;
    const result = (await this.commandBus.execute(
      new SendMessageCommand(content, senderId, roomId)
    )) as Result;
    if (result.failed) throw new WsException('failed to send message');
  }
}
