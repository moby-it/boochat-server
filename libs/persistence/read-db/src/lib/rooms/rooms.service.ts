import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { READ_DB_CONNECTION_NAME } from '../common';
import { Room, RoomDocument } from './room.schema';
@Injectable()
export class RoomService {
  private model: Model<RoomDocument>;
  constructor(@InjectConnection(READ_DB_CONNECTION_NAME) private connection: Connection) {
    this.model = this.connection.model(Room.name);
  }
  async createRoom() {
    throw new NotImplementedException();
  }
  async addUserToRoom() {
    throw new NotImplementedException();
  }
  async removeUserFromRoom() {
    throw new NotImplementedException();
  }
}
