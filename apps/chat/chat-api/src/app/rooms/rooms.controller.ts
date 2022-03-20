import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateRoomCommand, CreateRoomCommandResult, FindRoomByIdQuery, FindRoomByIdQueryResult, FindRoomsByUserIdQuery, FindRoomsByUserIdQueryResult, RoomDtoToRoom } from '@oursocial/application';
import { Room } from '@oursocial/domain';
import { CreateRoomDto } from '@oursocial/persistence';

@Controller('rooms')
export class RoomsController {

  constructor(private queryBus: QueryBus, private commandBus: CommandBus) { }

  @Get(':id')
  async roomById(@Param() roomId: string): Promise<Room> {
    const result = await this.queryBus.execute(new FindRoomByIdQuery(roomId)) as FindRoomByIdQueryResult;
    if (result.failed || !result.props) throw new BadRequestException(result.error);
    return result.props;
  }
  @Get('getByUserId/:id')
  async roomsByUserId(@Param('id') userId: string): Promise<Room[]> {
    const result = await this.queryBus.execute(new FindRoomsByUserIdQuery(userId)) as FindRoomsByUserIdQueryResult;
    if (result.failed || !result.props) throw new BadRequestException(result.error);
    return result.props;
  }
  @Post('create')
  async createRoom(@Body() roomdto: CreateRoomDto): Promise<Room> {
    const result = await this.commandBus.execute(new CreateRoomCommand(roomdto)) as CreateRoomCommandResult;
    if (result.failed || !result.props) throw new BadRequestException(result.error);
    const room = result.props;
    return RoomDtoToRoom(room);
  }
}
