import { EventPublisher, IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Result, User, UserId } from "@oursocial/domain";
import { UserPersistenceService } from "@oursocial/persistence";

export class GetUserByIdQuery implements IQuery {
  constructor(public readonly userId: UserId) { }
}

export type GetUserByIdQueryResult = Result<User | undefined>;

@QueryHandler(GetUserByIdQuery)
export class GetUserByIdQueryHandler implements IQueryHandler<GetUserByIdQuery> {
  constructor(private usersService: UserPersistenceService, private publisher: EventPublisher) { }
  async execute(query: GetUserByIdQuery): Promise<GetUserByIdQueryResult> {
    const userDto = await this.usersService.findById(query.userId);
    if (!userDto?.id) return Result.fail(`User for GoogleId: ${query.userId} not found`);
    const user = this.publisher.mergeObjectContext(User.create({
      googleId: userDto.googleId,
      name: userDto.name
    }, userDto.id));
    return Result.success(user);
  }

}
