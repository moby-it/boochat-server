import { Result, User } from '@boochat/domain';
import { UserPersistenceService } from '@boochat/persistence/shared-db';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';

export class GetUsersQuery implements IQuery {}
export type GetUsersQueryResult = Result<User[] | undefined>;
@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private usersService: UserPersistenceService) {}
  async execute(query: GetUsersQuery): Promise<User[]> {
    const users = await this.usersService.findAll();
  }
}
