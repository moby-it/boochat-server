import { Controller, Get, NotImplementedException, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller('room')
export class RoomController {
  constructor(private queryBus: QueryBus) {}
  @Get('getMany/:id')
  async getRoomsForUser(@Param('id') id: string) {
    throw new NotImplementedException();
  }
  @Get('getOne/:id')
  async getRoomById(@Param('id') id: string) {
    throw new NotImplementedException();
  }
}
