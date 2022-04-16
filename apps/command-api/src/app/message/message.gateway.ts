import { GetUserByIdQuery, GetUserByIdQueryResult, SendMessageCommand } from '@boochat/application';
import { CreateMessageDto, Result, User, UserId } from '@boochat/domain';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { MessageBody, SubscribeMessage, WebSocketGateway, WsException } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessageGateway {
  constructor(private queryBus: QueryBus, private commandBus: CommandBus) {}
  @SubscribeMessage('sendMessage')
  async onNewMessage(@MessageBody() newMessageEvent: CreateMessageDto) {
    const user = await this.getUser(newMessageEvent.senderId);
    if (!user) throw new Error(`onNewMessage: Failed to get user with id ${newMessageEvent.senderId}`);
    const { content, senderId, roomId } = newMessageEvent;
    const result = (await this.commandBus.execute(
      new SendMessageCommand(content, senderId, roomId)
    )) as Result;
    if (result.failed) throw new WsException('failed to send message');
  }
  private async getUser(userId: UserId): Promise<User | undefined> {
    const result = (await this.queryBus.execute(new GetUserByIdQuery(userId))) as GetUserByIdQueryResult;
    return result.props;
  }
}
