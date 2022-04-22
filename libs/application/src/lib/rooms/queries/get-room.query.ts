import { Result, Room, RoomId, GoogleId } from '@boochat/domain';
import { RoomsRepository } from '@boochat/persistence/read-db';
import { IQuery, IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Mapper } from '../../mapper';

export class GetRoomWithItemsQuery implements IQuery {
  constructor(public readonly roomId: RoomId) {}
}
export type GetRoomWithItemsQueryResponse = Result<Room | undefined>;
@QueryHandler(GetRoomWithItemsQuery)
export class GetRoomWithItemsQueryHandler implements IQueryHandler<GetRoomWithItemsQuery> {
  constructor(private roomRepository: RoomsRepository, private mapper: Mapper) {}
  async execute(query: GetRoomWithItemsQuery): Promise<GetRoomWithItemsQueryResponse> {
    try {
      const room = await this.roomRepository.getRoom(query.roomId);
      return Result.success(this.mapper.room.fromDocument.toRoomWithItems(room));
    } catch (e) {
      return Result.fail(e);
    }
  }
}
