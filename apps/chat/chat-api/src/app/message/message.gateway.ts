import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessagePersistenceService, RoomsPersistenceService, UserPersistenceService } from "@oursocial/persistence";
import { MessageDto } from "libs/persistence/src/lib/messages/message.dto";
import { RoomDto } from "libs/persistence/src/lib/rooms/room.dto";
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
    let room = await this.roomServices.findOne(messageDto.room.id);
    if (!room) {
      const users = await this.userService.findByGoogleId(messageDto.room.users);
      const createRoomDto: RoomDto = {
        name: messageDto.room.name,
        users: users.map(u => u._id.toString())
      };
      room = await this.roomServices.createRoom(createRoomDto);
      const userGoogleIds = users.map(u => u.googleId);
      const allSockets = await this.server.fetchSockets();
      const participantsSocketIds = this.activeUsersService.findSockets(userGoogleIds);
      const sockets = allSockets.filter(socket => participantsSocketIds.includes(socket.id));
      sockets.forEach(socket => socket.join(room._id.toString()));
    }
    const message = await this.messageService.create(messageDto);
    socket.to(message.room._id.toJSON()).emit('newMessage', message);
  }
}
