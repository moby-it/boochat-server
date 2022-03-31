import { QueryBus } from "@nestjs/cqrs";
import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { GetUserByIdQuery, GetUserByIdQueryResult } from "@oursocial/application";
import { User, UserId } from "@oursocial/domain";

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessageGateway {
  constructor(private queryBus: QueryBus) { }
  @SubscribeMessage('sendMessage')
  async onNewMessage(@MessageBody() newMessageEvent: any) {
    const user = await this.getUser(newMessage.senderId);
    if (!user) throw new Error(`Failed to get user with id ${newMessage.senderId}`);
    const { content, senderId, roomId, createdAt } = newMessage;
    user.sendsMessage(content, senderId, roomId, createdAt);
    user.commit();
  }
  private async getUser(userId: UserId): Promise<User | undefined> {
    const result = await this.queryBus.execute(new GetUserByIdQuery(userId)) as GetUserByIdQueryResult;
    if (result.failed) console.error(result.error);
    return result.props;
  }
}
