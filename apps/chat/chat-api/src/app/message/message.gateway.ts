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
  server: Server;
  constructor(
    private roomServices: RoomsPersistenceService,
    private messageService: MessagePersistenceService,
    private activeUsersService: ActiveUsersService
  ) { }
  @SubscribeMessage('sendMessage')
  async onNewMessage(@MessageBody() messageDto: MessageDto) {
    let roomId: string = messageDto.room.id;
    if (!roomId) {
      const createRoomDto: RoomDto = {
        name: messageDto.room.name,
        userIds: messageDto.room.userIds
      };
      const room = await this.roomServices.createRoom(createRoomDto);
      roomId = room._id.toString();
      const allSockets = await this.server.fetchSockets();
      const participantsSocketIds = this.activeUsersService.findSockets(messageDto.room.userIds);
      const sockets = allSockets.filter(socket => participantsSocketIds.includes(socket.id));
      sockets.forEach(socket => socket.join(roomId));
    }
    const message = await this.messageService.create(messageDto);
    this.server.to(roomId).emit('receiveMessage', message);
  }
}
