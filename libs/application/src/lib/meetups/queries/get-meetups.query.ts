import { Meetup, Result } from '@boochat/domain';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MeetupsRepository } from '@boochat/persistence/read-db';

export class GetMeetupsQuery {
  userId!: string;
}
export type GetMeetupsQueryResponse = Result<Meetup[] | undefined>;
@QueryHandler(GetMeetupsQuery)
export class GetMeetupsQueryHandler implements IQueryHandler<GetMeetupsQuery> {
  constructor(private meetupsRepository: MeetupsRepository) {}
  async execute(query: GetMeetupsQuery): Promise<GetMeetupsQueryResponse> {
    try {
      const meetupDocuments = await this.meetupsRepository.findByUserId(query.userId);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
