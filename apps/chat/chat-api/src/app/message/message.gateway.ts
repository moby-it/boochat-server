import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessageDto, MessagePersistenceService, RoomDto, RoomsPersistenceService, UserPersistenceService } from "@oursocial/persistence";
import { Server, Socket } from "socket.io";
import { ActiveUsersService } from "../active-users/active-users.service";

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessageGateway {
  @WebSocketServer()
  server!: Server;
  constructor(
    private roomServices: RoomsPersistenceService,
    private messageService: MessagePersistenceService,
    private activeUsersService: ActiveUsersService
  ) { }
  @SubscribeMessage('sendMessage')
  async onNewMessage(@MessageBody() newMessage: MessageDto) {
    let roomId = newMessage.room.id ?? '';
    if (newMessage.belongsOnANewRoom()) {
      const createRoomDto: RoomDto = {
        name: newMessage.room.name,
        userIds: newMessage.room.userIds
      };
      const room = await this.roomServices.createRoom(createRoomDto);
      const roomId = room._id.toString() as string;
      const allSockets = await this.server.fetchSockets();
      const participantsSocketIds = this.activeUsersService.findSockets(newMessage.room.userIds);
      const sockets = allSockets.filter(socket => participantsSocketIds.includes(socket.id));
      sockets.forEach(socket => socket.join(roomId));
    }

    const message = await this.messageService.create(newMessage);
    this.server.to(roomId).emit('receiveMessage', message);
  }
}
