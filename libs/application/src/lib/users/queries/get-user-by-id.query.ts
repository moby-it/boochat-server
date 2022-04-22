import { GoogleId, Result, User } from '@boochat/domain';
import { UserRepository } from '@boochat/persistence/read-db';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetUserByIdQuery implements IQuery {
  constructor(public readonly userId: GoogleId) {}
}

export type GetUserByIdQueryResult = Result<User | undefined>;

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private repository: UserRepository) {}
  async execute(query: GetUserByIdQuery): Promise<GetUserByIdQueryResult> {
    const userDto = await this.repository.findById(query.userId);
    if (!userDto) return Result.fail(`User for Id: ${query.userId} not found`);
    const user = User.create(
      {
        name: userDto.name,
        imageUrl: userDto.imageUrl
      },
      userDto.id
    );
    return Result.success(user);
  }
}
