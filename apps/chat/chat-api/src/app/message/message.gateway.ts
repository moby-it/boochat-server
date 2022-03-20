import { QueryBus } from "@nestjs/cqrs";
import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { GetUserByIdQuery, GetUserByIdQueryResult } from "@oursocial/application";
import { User } from "@oursocial/domain";
import { MessageDto } from "@oursocial/persistence";

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessageGateway {
  constructor( private queryBus: QueryBus) { }
  @SubscribeMessage('sendMessage')
  async onNewMessage(@MessageBody() newMessage: MessageDto) {
    const result = await this.queryBus.execute(new GetUserByIdQuery(newMessage.senderId)) as GetUserByIdQueryResult;
    if (result.failed) throw new Error(`Failed to get user with id ${newMessage.senderId}`);
    const user = result.props as User;
    const { content, senderId, roomId, createdAt } = newMessage;
    user.sendsMessage(content, senderId, roomId, createdAt);
    user.commit();
  }
}
