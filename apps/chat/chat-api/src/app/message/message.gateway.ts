import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { MessagePersistenceService, RoomsPersistenceService } from "@oursocial/persistence";
import { CreateMessageDto } from "libs/persistence/src/lib/messages/message.dto";
import { CreateRoomDto } from "libs/persistence/src/lib/rooms/room.dto";
import { Socket } from "socket.io";

@WebSocketGateway({
    namespace: 'message',
    cors: {
        origin: '*'
    }
})
export class MessageGateway {
    constructor(private roomServices: RoomsPersistenceService, private messageService: MessagePersistenceService) { }
    @SubscribeMessage('newMessage')
    async onNewMessage(@MessageBody() messageDto: CreateMessageDto, @ConnectedSocket() socket: Socket) {
        const roomExists = await this.roomServices.exists(messageDto.room.id);
        if (!roomExists) {
            const createRoomDto: CreateRoomDto = {
                name: messageDto.room.name,
                participants: messageDto.room.participants.map(p => p.email.value)
            };
            await this.roomServices.createRoom(createRoomDto);
        }
        const message = await this.messageService.create(messageDto);
        socket.join(message.room._id.toString());
        socket.to(message.room._id.toJSON()).emit('newMessage', message);
    }
}