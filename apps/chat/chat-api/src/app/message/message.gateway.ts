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
    private activeUsersService: ActiveUsersService,
    private userService: UserPersistenceService
  ) { }
  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() messageDto: MessageDto, @ConnectedSocket() socket: Socket) {
    let roomId: string = messageDto.room.id;
    if (!roomId) {
      const users = await this.userService.findByGoogleId(messageDto.room.userIds);
      const createRoomDto: RoomDto = {
        name: messageDto.room.name,
        userIds: users.map(u => u._id.toString())
      };
      const room = await this.roomServices.createRoom(createRoomDto);
      roomId = room._id.toString();
      const userGoogleIds = users.map(u => u.googleId);
      const allSockets = await this.server.fetchSockets();
      const participantsSocketIds = this.activeUsersService.findSockets(userGoogleIds);
      const sockets = allSockets.filter(socket => participantsSocketIds.includes(socket.id));
      sockets.forEach(socket => socket.join(roomId));
    }
    const message = await this.messageService.create(messageDto);
    socket.to(roomId).emit('newMessage', message);
  }
}