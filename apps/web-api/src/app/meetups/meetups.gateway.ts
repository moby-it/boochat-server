import { GetUserByIdQuery, GetUserByIdQueryResult } from '@boochat/application';
import { User, UserId } from '@boochat/domain';
import { QueryBus } from '@nestjs/cqrs';
import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MeetupsGateway {
  constructor(private queryBus: QueryBus) {}
  private async getUser(userId: UserId): Promise<User | undefined> {
    const result = (await this.queryBus.execute(new GetUserByIdQuery(userId))) as GetUserByIdQueryResult;
    if (result.failed) console.error(result.error);
    return result.props;
  }
}
