import { CreateMessageDto, CreateRoomDto, RoomId, RoomItemEnum, UserId } from '@boochat/domain';
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
  async createRoom(dto: CreateRoomDto) {
    const room = new this.roomModel({
      ...dto
    });
    await room.save();
  }
  async updateRoomImage(imageUrl: string, roomId: string) {
    await this.roomModel.updateOne({ _id: roomId }, { imageUrl: imageUrl });
  }
  async logLastVisit(roomId: RoomId, userId: UserId, timestamp: Date) {
    await this.roomModel.updateOne(
      { _id: roomId, 'lastVisits.userId': userId },
      { $set: { 'lastVisits.$.timestamp': timestamp } }
    );
  }
  async inviteUserToRoom(inviteeId: UserId, roomId: RoomId) {
    await this.roomModel.updateOne({ _id: roomId }, { $push: { participantIds: inviteeId } });
  }
  async leaveRoom(userId: UserId, roomId: RoomId) {
    await this.roomModel.updateOne({ _id: roomId }, { $pull: { participantIds: userId } });
  }
  async saveMessage(dto: CreateMessageDto) {
    const message = new this.roomItemsModel({
      type: RoomItemEnum.Message,
      ...dto
    });
    await message.save();
  }
  async saveAnnouncement(id: string, content: string, roomId: RoomId) {
    const announcement = new this.roomItemsModel({
      _id: id,
      type: RoomItemEnum.Announcement,
      content,
      roomId
    });
    await announcement.save();
  }
}
