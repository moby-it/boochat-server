import { RoomId, UserId } from '@boochat/domain';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { READ_DB_CONNECTION_NAME } from '../common';
import { RoomItem, RoomItemDocument } from '../room-items';
import { findByUserIdQuery } from './queries';
import { findRoomByIdQuery } from './queries/findRoomById.query';
import { Room, RoomDocument, RoomWithItemsDocument, RoomWithLastItemDocument } from './room.schema';
@Injectable()
export class RoomsRepository {
  private readonly roomItemsModel: Model<RoomItemDocument>;
  private readonly roomModel: Model<RoomDocument>;
  constructor(@InjectConnection(READ_DB_CONNECTION_NAME) private connection: Connection) {
    this.roomItemsModel = this.connection.model(RoomItem.name);
    this.roomModel = this.connection.model(Room.name);
  }
  async getRoomsByUserId(userId: UserId): Promise<RoomWithLastItemDocument[]> {
    return await this.roomModel.aggregate<RoomWithLastItemDocument>(findByUserIdQuery(userId));
  }
  async getRoom(roomId: RoomId): Promise<RoomWithItemsDocument> {
    const queryResult = await this.roomModel.aggregate<RoomWithItemsDocument>(findRoomByIdQuery(roomId));
    if (queryResult.length === 1) return queryResult[0];
    throw new InternalServerErrorException('Invalid query result length for getRoom query');
  }
}
