import { Controller, Get, NotImplementedException, Query } from '@nestjs/common';
import { Room } from '@oursocial/domain';

@Controller('rooms')
export class RoomsController {
  @Get()
  async roomById(@Query() roomId: string): Promise<Room> {
    throw new NotImplementedException();
  }
  async roomsByUserId(@Query() userId: string) {
    throw new NotImplementedException();
  }
  async addUserToRoom(@Query() userId: string, @Query() roomId: string) {
    throw new NotImplementedException();
  }
}
