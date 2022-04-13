import { Result, Room, UserId } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Mapper } from '../../mapper';

export class GetRoomsWithLastItemQuery implements IQuery {
  constructor(public readonly userId: UserId) {}
}
export type GetRoomsWithLastItemQueryResponse = Result<Room[] | undefined>;
@QueryHandler(GetRoomsWithLastItemQuery)
export class GetRoomsWithLastItemQueryHandler implements IQueryHandler<GetRoomsWithLastItemQuery> {
  constructor(private roomRepository: RoomsRepository, private mapper: Mapper) {}
  async execute(query: GetRoomsWithLastItemQuery): Promise<GetRoomsWithLastItemQueryResponse> {
    try {
      const rooms = await this.roomRepository.getRoomsByUserId(query.userId);
      return Result.success(this.mapper.room.fromDocuments.toRoomsWithLastMessage(rooms));
    } catch (e) {
      return Result.fail(e);
    }
  }
}
