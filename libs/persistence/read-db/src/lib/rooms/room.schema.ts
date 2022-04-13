import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MongoEntity } from '../common';
import { RoomItemDocument } from '../room-items';
export type RoomDocument = Room & Document;
export type RoomWithLastItemDocument = RoomDocument & { lastItem: RoomItemDocument };
export type RoomWithItemsDocument = RoomDocument & { items: RoomItemDocument[] };
@Schema({
  timestamps: true
})
export class Room extends MongoEntity {
  @Prop()
  name!: string;
  @Prop()
  participants!: string[];
  @Prop()
  imageUrl!: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
export const ROOM_COLLECTION_NAME = 'Rooms';
