import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { READ_DB_CONNECTION_NAME } from '../common';
import { RoomItem, RoomItemDocument } from './room-item.schema';

@Injectable()
export class RoomItemService {
  private model: Model<RoomItemDocument>;
  constructor(@InjectConnection(READ_DB_CONNECTION_NAME) private connection: Connection) {
    this.model = this.connection.model(RoomItem.name);
  }
  async saveMessage() {
    throw new NotImplementedException();
  }
  async saveAnnouncement() {
    throw new NotImplementedException();
  }
}
