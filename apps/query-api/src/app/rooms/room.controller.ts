import { GetRoomWithItemsQuery, GetRoomWithItemsQueryResponse, JwtGuard } from '@boochat/application';
import { Room } from '@boochat/domain';
import { Controller, Get, InternalServerErrorException, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller('rooms')
export class RoomController {
  constructor(private queryBus: QueryBus) {}
  @UseGuards(JwtGuard)
  @Get('getOne/:id')
  async getRoomById(@Param('id') id: string): Promise<Room> {
    const result = (await this.queryBus.execute(new GetRoomWithItemsQuery(id))) as GetRoomWithItemsQueryResponse;
    if (result.succeded) return result.props as Room;
    throw new InternalServerErrorException(result.error);
  }
}
