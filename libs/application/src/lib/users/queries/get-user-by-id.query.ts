import {
  EventPublisher,
  IQuery,
  IQueryHandler,
  QueryHandler,
} from '@nestjs/cqrs';
import { Result, User, UserId } from '@boochat/domain';
import { UserPersistenceService } from '@boochat/persistence';

export class GetUserByIdQuery implements IQuery {
  constructor(public readonly userId: UserId) {}
}

export type GetUserByIdQueryResult = Result<User | undefined>;

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler
  implements IQueryHandler<GetUserByIdQuery>
{
  constructor(
    private usersService: UserPersistenceService,
    private publisher: EventPublisher
  ) {}
  async execute(query: GetUserByIdQuery): Promise<GetUserByIdQueryResult> {
    const userDto = await this.usersService.findOneByGoogleId(query.userId);
    if (!userDto)
      return Result.fail(`User for Object Id: ${query.userId} not found`);
    const user = this.publisher.mergeObjectContext(
      User.create(
        {
          googleId: userDto.googleId,
          name: userDto.name,
          imageUrl: userDto.imageUrl,
        },
        userDto.googleId
      )
    );
    return Result.success(user);
  }
}
