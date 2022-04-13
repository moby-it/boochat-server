import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MongoEntity } from '../common';
import { Room } from '../rooms';
export type RoomItemDocument = RoomItem & Document;
enum RoomItemEnum {
  Message,
  Announcement
}
@Schema({
  timestamps: true
})
export class RoomItem extends MongoEntity {
  @Prop({ type: Number, required: true })
  type!: RoomItemEnum;
  @Prop()
  senderId!: string;
  @Prop()
  content!: string;
  @Prop({ type: String, ref: Room.name })
  roomId!: string;
}

export const RoomItemSchema = SchemaFactory.createForClass(RoomItem);
export const ROOM_ITEM_COLLECTION_NAME = 'RoomItems';
