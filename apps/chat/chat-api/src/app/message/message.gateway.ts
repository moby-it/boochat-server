import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessagePersistenceService, RoomsPersistenceService } from "@oursocial/persistence";
import { CreateMessageDto } from "libs/persistence/src/lib/messages/message.dto";
import { CreateRoomDto } from "libs/persistence/src/lib/rooms/room.dto";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  namespace: 'message',
  cors: {
    origin: '*'
  }
})
export class MessageGateway {
  @WebSocketServer()
  server: Server;
  constructor(private roomServices: RoomsPersistenceService, private messageService: MessagePersistenceService) { }
  @SubscribeMessage('newMessage')
  async onNewMessage(@MessageBody() messageDto: CreateMessageDto, @ConnectedSocket() socket: Socket) {
    let room = await this.roomServices.findOne(messageDto.room.id);
    if (!room) {
      const createRoomDto: CreateRoomDto = {
        name: messageDto.room.name,
        participants: messageDto.room.participants.map(p => p.id)
      };
      // const participantsSockets = await (await this.server.fetchSockets()).filter(socket => socket.id);
      socket.join(room._id.toString());
    }
    const message = await this.messageService.create(messageDto);
    socket.to(message.room._id.toJSON()).emit('newMessage', message);
  }
}
