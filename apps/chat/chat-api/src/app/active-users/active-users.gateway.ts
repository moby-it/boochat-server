import { CommandBus } from '@nestjs/cqrs';
import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import { ActiveUsersStore } from "@oursocial/persistence";
import { AddUserToStoreCommand, AddUserToStoreCommandResult } from "./commands/add-user-to-store.command";
import { UserJoinsRoomCommand, UserJoinsRoomCommandResult } from "./commands/user-joins-rooms.command";
@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class ActiveUsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(private commandBus: CommandBus, private activeUsersStore: ActiveUsersStore) { }
  async handleConnection(client: Socket) {
    const googleId = client.handshake.query.googleId as string;
    const addUserToStoreResult = await this.commandBus
      .execute<AddUserToStoreCommand, AddUserToStoreCommandResult>(new AddUserToStoreCommand(googleId, client));

    if (addUserToStoreResult.failed) {
      client.disconnect();
      console.error(addUserToStoreResult.error);
      return;
    }
    const userJoinsRoomResult = await this.commandBus
      .execute<UserJoinsRoomCommand, UserJoinsRoomCommandResult>(new UserJoinsRoomCommand(client, addUserToStoreResult.props!.userId));
    if (userJoinsRoomResult.failed) {
      client.disconnect();
      console.error(userJoinsRoomResult.error);
      return;
    }
    client.broadcast.emit('usersList', this.activeUsersStore.activeUsers);

  }

  handleDisconnect(client: Socket) {
    const googleId = client.handshake.query.googleId as string;
    if (googleId) {
      this.activeUsersStore.removeUser(googleId);
      client.broadcast.emit('usersList', this.activeUsersStore.activeUsers);
    }
  }
}
