import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { BaseDbEntity } from "../common/base.entity";
import { Room } from "../rooms/room.schema";
export type MessageDocument = Message & Document;

@Schema()
export class Message extends BaseDbEntity {
  @Prop()
  sender: string;
  @Prop()
  receiver: string;
  @Prop()
  content: string;
  @Prop({ type: Types.ObjectId, name: Room.name })
  room: Types.ObjectId;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
