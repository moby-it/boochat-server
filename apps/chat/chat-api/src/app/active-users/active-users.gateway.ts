import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from "@nestjs/websockets";
import { Email, User } from "@oursocial/domain";
import { RoomsPersistenceService, UserPersistenceService } from "@oursocial/persistence";
import { Types } from 'mongoose';
import { Socket } from 'socket.io';
@WebSocketGateway({
  namespace: 'active-users',
  cors: {
    origin: '*'
  }
})
export class ActiveUsersGateway implements OnGatewayConnection, OnGatewayDisconnect {
  activeUsers: Map<string, Email> = new Map();

  constructor(private usersService: UserPersistenceService, private roomsService: RoomsPersistenceService) { }
  async handleConnection(client: Socket) {
    const email = Email.create(client.handshake.query.email as string);
    if (email) {
      let user = await this.usersService.findOneByEmail(email);
      if (!user) {
        user = await this.usersService.create({ email: email.value });
      }
      await this.joinRooms(client, User.create({ email: Email.create(user.email) }, user._id.toString()));
      this.activeUsers.set(client.id, email);
      client.broadcast.emit('usersList', Array.from(this.activeUsers.values()));
    }
  }

  handleDisconnect(client: Socket) {
    const email = client.handshake.query.email as string;
    if (email) {
      this.activeUsers.delete(client.id);
      client.broadcast.emit('usersList', Array.from(this.activeUsers.values()));
    }
  }
  private async joinRooms(client: Socket, user: User) {
    const rooms = await this.roomsService.findByUser({ _id: new Types.ObjectId(user.id), email: user.email.value, timestamp: null });
    rooms.forEach(room => client.join(room._id.toString()));
  }
}
