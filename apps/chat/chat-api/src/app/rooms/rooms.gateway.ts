import { NotImplementedException } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Result } from "@oursocial/domain";
import { Server, Socket } from "socket.io";
import { AddUserToRoomCommand, AddUserToRoomCommandResult } from "./commands/add-user-to-room.command";
import { ConnectUsersToRoomCommand, ConnectUsersToRoomResult } from "./commands/connect-users-to-room.command";
import { DisconnectUsersFromRoomCommand, DisconnectUsersFromRoomResult } from "./commands/disconnect-users-from-room.command";
import { RemoveUserFromRoomCommand, RemoveUserFromRoomCommandResult } from "./commands/remove-user-from-room.command";
import { SaveUserLastRoomVisitCommand } from "./commands/save-user-last-room-visit.command";

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class RoomsGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;
  constructor(private commandBus: CommandBus) { }
  handleDisconnect(client: Socket) {
    console.log('Client Data');
    console.log(client.data);
  }
  @SubscribeMessage('addUserToRoom')
  async addUserToRoom(@MessageBody('userId') userId: string, @MessageBody('roomId') roomId: string): Promise<void> {
    const addUserResult = await this.commandBus.execute(new AddUserToRoomCommand(userId, roomId)) as AddUserToRoomCommandResult;
    if (addUserResult.failed) console.error(addUserResult.error);

    const connectUsersResult = await this.commandBus.execute<ConnectUsersToRoomCommand, ConnectUsersToRoomResult>(new ConnectUsersToRoomCommand(this.server, [userId], roomId));
    if (connectUsersResult.failed) console.error(connectUsersResult.error);
  }
  @SubscribeMessage('removeUserFromRoom')
  async removeUserFromRoom(@MessageBody('userId') userId: string, @MessageBody('roomId') roomId: string) {
    const result = await this.commandBus.execute(new RemoveUserFromRoomCommand(userId, roomId)) as RemoveUserFromRoomCommandResult;
    if (result.failed) console.error(result.error);

    const disconnectUsersResult = await this.commandBus.execute<DisconnectUsersFromRoomCommand, DisconnectUsersFromRoomResult>(new DisconnectUsersFromRoomCommand(this.server, [userId], roomId));
    if (disconnectUsersResult.failed) console.error(disconnectUsersResult.error);
  }
  @SubscribeMessage('userClosedRoom')
  async userClosedRoom(@MessageBody('roomId') roomId: string, @MessageBody('userId') userId: string, @MessageBody('timestamp') timestamp: Date) {
    const result = await this.commandBus.execute(new SaveUserLastRoomVisitCommand(roomId, userId, timestamp)) as Result;
    if (result.failed) { console.error(result.error); };
  }
}
