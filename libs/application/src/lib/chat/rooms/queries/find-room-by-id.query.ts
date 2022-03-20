import { NotFoundException } from "@nestjs/common";
import { IQuery, IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Result, Room } from "@oursocial/domain";
import { MessagePersistenceService, RoomsPersistenceService } from "@oursocial/persistence";
import { RoomDtoToRoom } from "@oursocial/application";

export class FindRoomByIdQuery implements IQuery {
  constructor(public readonly roomId: string) { }
}
export type FindRoomByIdQueryResult = Result<Room | undefined>;

@QueryHandler(FindRoomByIdQuery)
export class FindRoomByIdQueryHandler implements IQueryHandler<FindRoomByIdQuery> {
  constructor(private messageService: MessagePersistenceService, private roomsService: RoomsPersistenceService) { }
  async execute(query: FindRoomByIdQuery): Promise<FindRoomByIdQueryResult> {
    const { roomId } = query;
    if (!roomId) return Result.fail('No id provided');
    const dbRoom = await this.roomsService.findOne(roomId);
    if (!dbRoom) return Result.fail(new NotFoundException());
    const messages = await this.messageService.findByRoomId(roomId);
    const room = RoomDtoToRoom(dbRoom, messages);
    return Result.success(room);
  }

}
