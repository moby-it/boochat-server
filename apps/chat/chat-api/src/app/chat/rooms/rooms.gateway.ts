import { CommandBus } from "@nestjs/cqrs";
import { MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { RoomsPersistenceService } from "@oursocial/persistence";
import { Server, Socket } from "socket.io";
import { ConnectUsersToRoomCommand, ConnectUsersToRoomResult } from "../commands";
import { DisconnectUsersFromRoomCommand, DisconnectUsersFromRoomResult } from "../commands/disconnect-users-from-room.command";

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class RoomsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;
  constructor(private roomsService: RoomsPersistenceService, private commandBus: CommandBus) { }
  handleDisconnect(client: Socket) {
    console.log('Client Data');
    console.log(client.data);
  }
  @SubscribeMessage('addUserToRoom')
  async addUserToRoom(@MessageBody('userId') userId: string, @MessageBody('roomId') roomId: string): Promise<void> {
    const addUserResult = await this.roomsService.addUserToRoom(userId, roomId);
    if (addUserResult.failed) console.error(addUserResult.error);

    const connectUsersResult = await this.commandBus.execute<ConnectUsersToRoomCommand, ConnectUsersToRoomResult>(new ConnectUsersToRoomCommand(this.server, [userId], roomId));
    if (connectUsersResult.failed) console.error(connectUsersResult.error);
  }
  @SubscribeMessage('removeUserFromRoom')
  async removeUserFromRoom(@MessageBody('userId') userId: string, @MessageBody('roomId') roomId: string) {
    const result = await this.roomsService.removeUserFromRoom(userId, roomId);
    if (result.failed) console.error(result.error);

    const disconnectUsersResult = await this.commandBus.execute<DisconnectUsersFromRoomCommand, DisconnectUsersFromRoomResult>(new DisconnectUsersFromRoomCommand(this.server, [userId], roomId));
    if (disconnectUsersResult.failed) console.error(disconnectUsersResult.error);
  }
}
