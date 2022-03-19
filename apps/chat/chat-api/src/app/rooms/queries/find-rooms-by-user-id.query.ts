import { BadRequestException } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Result, Room } from "@oursocial/domain";
import { RoomsPersistenceService } from "@oursocial/persistence";
import { RoomDtoToRoom } from "../../common";

export class FindRoomsByUserIdQuery {
  constructor(public readonly userId: string) { }
}

export type FindRoomsByUserIdQueryResult = Result<Room[] | undefined>;
@QueryHandler(FindRoomsByUserIdQuery)
export class FindRoomByUserIdQueryHandler implements IQueryHandler<FindRoomsByUserIdQuery>{
  constructor(private roomsService: RoomsPersistenceService) { }
  async execute(query: FindRoomsByUserIdQuery): Promise<Result<Room[] | undefined>> {
    const { userId } = query;
    if (!userId) return Result.fail(new BadRequestException('no user id provided.'));
    const dbRooms = await this.roomsService.findByUserId(userId);
    const rooms = dbRooms.map(dbRoom => RoomDtoToRoom(dbRoom, [dbRoom.lastMessage]));
    return Result.success(rooms);
  }
}
