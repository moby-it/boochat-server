import { CommandBus } from "@nestjs/cqrs";
import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { MessageDto, MessageWithRoomDto, shouldCreateRoom } from "@oursocial/persistence";
import { instanceToPlain } from "class-transformer";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: {
    origin: '*'
  }
})
export class MessageGateway {
  @WebSocketServer()
  server!: Server;
  constructor(
    private commandBus: CommandBus,

  ) { }
  @SubscribeMessage('sendMessage')
  async onNewMessage(@MessageBody() newMessage: MessageDto | MessageWithRoomDto) {
    let roomId = newMessage.roomId ?? '';
    if (shouldCreateRoom(newMessage)) {
      const createRoomResult = await this.commandBus
        .execute(new CreateRoomCommand(newMessage.room)) as CreateRoomCommandResult;
      if (createRoomResult.failed)
        throw (createRoomResult.error);

      // typescript does not recognise that props is always defined at this state of the program
      newMessage.room = { ...newMessage.room, id: createRoomResult.props!.roomId };
      roomId = createRoomResult.props!.roomId;

      const connectUsersToNewRoomResult = await this.commandBus
        .execute(new ConnectUsersToRoomCommand(this.server, newMessage.room.userIds, roomId)) as ConnectUsersToRoomResult;

      if (connectUsersToNewRoomResult.failed)
        throw connectUsersToNewRoomResult.error;
    }

    const createMesageResult = await this.commandBus.
      execute(new CreaterMessageCommand(newMessage)) as CreateRoomCommandResult;
    if (createMesageResult.failed)
      throw createMesageResult.error;
    const response = instanceToPlain(createMesageResult.props, { excludePrefixes: ['_'] });
    this.server.to(roomId).emit('receiveMessage', response);
  }
}
