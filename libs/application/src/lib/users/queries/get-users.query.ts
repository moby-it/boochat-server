import { Result, User } from '@boochat/domain';
import { UserRepository } from '@boochat/persistence/read-db';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Mapper } from '../../mapper';

export class GetUsersQuery implements IQuery {}
export type GetUsersQueryResult = Result<User[] | undefined>;
@QueryHandler(GetUsersQuery)
export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  constructor(private repository: UserRepository, private mapper: Mapper) {}
  async execute(query: GetUsersQuery): Promise<GetUsersQueryResult> {
    try {
      const userDocuments = await this.repository.findAll();
      const users = this.mapper.user.fromDocuments.ToUsers(userDocuments);
      return Result.success(users);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
