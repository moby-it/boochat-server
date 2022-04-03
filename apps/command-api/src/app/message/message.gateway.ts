import { GetUserByIdQuery, GetUserByIdQueryResult } from '@boochat/application';
import { CreateMessageDto, User, UserId } from '@boochat/domain';
import { QueryBus } from '@nestjs/cqrs';
import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessageGateway {
  constructor(private queryBus: QueryBus) {}
  @SubscribeMessage('sendMessage')
  async onNewMessage(@MessageBody() newMessageEvent: CreateMessageDto) {
    const user = await this.getUser(newMessageEvent.senderId);
    if (!user) throw new Error(`onNewMessage: Failed to get user with id ${newMessageEvent.senderId}`);
    const { content, senderId, roomId } = newMessageEvent;
    user.sendsMessage(content, senderId, roomId);
    user.commit();
  }
  private async getUser(userId: UserId): Promise<User | undefined> {
    const result = (await this.queryBus.execute(new GetUserByIdQuery(userId))) as GetUserByIdQueryResult;
    if (result.failed) console.error(result.error);
    return result.props;
  }
}
