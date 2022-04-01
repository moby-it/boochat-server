import { QueryBus } from '@nestjs/cqrs';
import { MessageBody, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { GetUserByIdQuery, GetUserByIdQueryResult } from '@boochat/application';
import { User, UserId, CreateMessageEvent } from '@boochat/domain';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessageGateway {
  constructor(private queryBus: QueryBus) {}
  @SubscribeMessage('sendMessage')
  async onNewMessage(@MessageBody() newMessageEvent: CreateMessageEvent) {
    const user = await this.getUser(newMessageEvent.senderId);
    if (!user) throw new Error(`Failed to get user with id ${newMessageEvent.senderId}`);
    const { content, senderId, roomId, createdAt } = newMessageEvent;
    user.sendsMessage(content, senderId, roomId, createdAt);
    user.commit();
  }
  private async getUser(userId: UserId): Promise<User | undefined> {
    const result = (await this.queryBus.execute(new GetUserByIdQuery(userId))) as GetUserByIdQueryResult;
    if (result.failed) console.error(result.error);
    return result.props;
  }
}
