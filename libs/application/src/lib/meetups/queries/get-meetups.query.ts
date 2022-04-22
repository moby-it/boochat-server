import { Meetup, Result, GoogleId } from '@boochat/domain';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { MeetupsRepository } from '@boochat/persistence/read-db';
import { Mapper } from '../../mapper';

export class GetMeetupsQuery implements IQuery {
  constructor(public readonly userId: GoogleId) {}
}
export type GetMeetupsQueryResult = Result<Meetup[] | undefined>;
@QueryHandler(GetMeetupsQuery)
export class GetMeetupsQueryHandler implements IQueryHandler<GetMeetupsQuery> {
  constructor(private meetupsRepository: MeetupsRepository, private mapper: Mapper) {}
  async execute(query: GetMeetupsQuery): Promise<GetMeetupsQueryResult> {
    try {
      const meetupDocuments = await this.meetupsRepository.findByUserId(query.userId);
      return Result.success(this.mapper.meetups.fromDocuments.ToMeetups(meetupDocuments));
    } catch (e) {
      return Result.fail(e);
    }
  }
}
