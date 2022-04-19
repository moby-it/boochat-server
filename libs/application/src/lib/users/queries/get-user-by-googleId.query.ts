import { GoogleId, Result, User } from '@boochat/domain';
import { UserPersistenceService } from '@boochat/persistence/shared-db';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetUserByGoogleIdQuery implements IQuery {
  constructor(public readonly googleId: GoogleId) {}
}

export type GetUserByGoogleIdQueryResult = Result<User | undefined>;

@QueryHandler(GetUserByGoogleIdQuery)
export class GetUserByGoogleIdQueryHandler implements IQueryHandler<GetUserByGoogleIdQuery> {
  constructor(private usersService: UserPersistenceService) {}
  async execute(query: GetUserByGoogleIdQuery): Promise<GetUserByGoogleIdQueryResult> {
    const userDto = await this.usersService.findOneByGoogleId(query.googleId);
    if (!userDto?.id) return Result.fail(`User for GoogleId: ${query.googleId} not found`);
    const user = User.create(
      {
        googleId: userDto.googleId,
        name: userDto.name,
        imageUrl: userDto.imageUrl
      },
      userDto.id
    );
    return Result.success(user);
  }
}
