import {
  ActiveUsersService,
  AuthService,
  GetRoomWithItemsQuery,
  GetRoomWithItemsQueryResponse,
  HttpToken,
  JwtGuard
} from '@boochat/application';
import { Room } from '@boochat/domain';
import { Controller, Get, InternalServerErrorException, Param, UseGuards } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

@Controller('rooms')
export class RoomController {
  constructor(
    private queryBus: QueryBus,
    private activeUserService: ActiveUsersService,
    private authService: AuthService
  ) {}
  @UseGuards(JwtGuard)
  @Get('getOne/:id')
  async getRoomById(@HttpToken() token: string, @Param('id') id: string): Promise<Room> {
    const userId = await this.authService.getUserId(token);
    console.log(`User ${userId} requested room data with roomId ${id}`);
    this.activeUserService.userRoomsMap.set(userId, id);
    const result = (await this.queryBus.execute(
      new GetRoomWithItemsQuery(id)
    )) as GetRoomWithItemsQueryResponse;
    if (result.succeded) return result.props as Room;
    throw new InternalServerErrorException(result.error);
  }
}
