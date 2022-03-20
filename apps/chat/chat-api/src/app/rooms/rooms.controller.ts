import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { FindRoomByIdQuery, FindRoomByIdQueryResult, FindRoomsByUserIdQuery, FindRoomsByUserIdQueryResult } from '@oursocial/application';
import { Room } from '@oursocial/domain';

@Controller('rooms')
export class RoomsController {

  constructor(private queryBus: QueryBus) { }

  @Get(':id')
  async roomById(@Param() roomId: string): Promise<Room> {
    const result = await this.queryBus.execute(new FindRoomByIdQuery(roomId)) as FindRoomByIdQueryResult;
    if (result.failed || !result.props) throw new BadRequestException(result.error);
    return result.props;
  }
  @Get('getByUserId/:id')
  async roomsByUserId(@Param() userId: string): Promise<Room[]> {
    const result = await this.queryBus.execute(new FindRoomsByUserIdQuery(userId)) as FindRoomsByUserIdQueryResult;
    if (result.failed || !result.props) throw new BadRequestException(result.error);
    return result.props;
  }

}
