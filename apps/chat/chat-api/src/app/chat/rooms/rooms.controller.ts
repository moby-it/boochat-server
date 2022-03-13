import { Controller, Get, InternalServerErrorException, NotFoundException, Param, Post, Query } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Room } from '@oursocial/domain';
import { MessagePersistenceService, RoomsPersistenceService } from '@oursocial/persistence';
import { dbRoomToRoom } from '../../common/mappings/room.mappings';
import { ConnectUsersToRoomCommand, ConnectUsersToRoomResult } from '../commands';

@Controller('rooms')
export class RoomsController {

  constructor(private roomsService: RoomsPersistenceService, private messageService: MessagePersistenceService, private commandBus: CommandBus) { }
  @Get(':id')
  async roomById(@Param() roomId: string): Promise<Room> {
    const dbRoom = await this.roomsService.findOne(roomId);
    if (!dbRoom) throw new NotFoundException();
    const messages = await this.messageService.findByRoomId(roomId);
    const room = dbRoomToRoom(dbRoom, messages);
    return room;
  }
  @Get('getByUserId/:id')
  async roomsByUserId(@Param() userId: string): Promise<Room[]> {
    const dbRooms = await this.roomsService.findByUserId(userId);
    const rooms = dbRooms.map(dbRoom => dbRoomToRoom(dbRoom, []));
    return rooms;
  }
  @Post('addUserToRoom')
  async addUserToRoom(@Query('userId') userId: string, @Query('roomId') roomId: string): Promise<void> {
    const addUserResult = await this.roomsService.addUserToRoom(userId, roomId);
    if (addUserResult.failed) throw new InternalServerErrorException(addUserResult.error);
    // const connectResult = await this.commandBus.execute<ConnectUsersToRoomCommand, ConnectUsersToRoomResult>(new ConnectUsersToRoomCommand([userId], roomId));
    // if (connectResult.failed) throw new InternalServerErrorException(addUserResult.error);
  }
  @Post('removeUserFromRoom')
  async removeUserFromRoom(@Query('userId') userId: string, @Query('roomId') roomId: string) {
    const result = await this.roomsService.removeUserFromRoom(userId, roomId);
    if (result.failed) throw new InternalServerErrorException(result.error);
  }
}
