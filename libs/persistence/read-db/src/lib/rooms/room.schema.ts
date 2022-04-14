import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MongoEntity } from '../common';
import { RoomItemDocument } from '../room-items';
import { LastVisit } from './last-visits';
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
  participantIds!: string[];
  @Prop()
  imageUrl!: string;
  @Prop({ type: Types.Array, default: [] })
  lastVisit!: LastVisit[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
export const ROOM_COLLECTION_NAME = 'Rooms';
