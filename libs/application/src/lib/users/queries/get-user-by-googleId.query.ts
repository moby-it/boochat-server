import { EventPublisher, IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GoogleId, Result, User } from "@oursocial/domain";
import { UserPersistenceService } from "@oursocial/persistence";

export class GetUserByGoogleIdQuery implements IQuery {
  constructor(public readonly googleId: GoogleId) { }
}

export type GetUserByGoogleIdQueryResult = Result<User | undefined>;

@QueryHandler(GetUserByGoogleIdQuery)
export class GetUserByGoogleIdQueryHandler implements IQueryHandler<GetUserByGoogleIdQuery> {
  constructor(private usersService: UserPersistenceService, private publisher: EventPublisher) { }
  async execute(query: GetUserByGoogleIdQuery): Promise<GetUserByGoogleIdQueryResult> {
    const userDto = await this.usersService.findOneByGoogleId(query.googleId);
    if (!userDto?.id) return Result.fail(`User for GoogleId: ${query.googleId} not found`);
    const user = this.publisher.mergeObjectContext(User.create({
      googleId: userDto.googleId,
      name: userDto.name
    }, userDto.id));
    return Result.success(user);
  }

}
