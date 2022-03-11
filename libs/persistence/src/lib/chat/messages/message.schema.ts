import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { Room } from "../rooms/room.schema";
export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
  @Prop({ type: Types.ObjectId, name: Room.name })
  sender!: Types.ObjectId;
  @Prop()
  content!: string;
  @Prop({ type: Types.ObjectId, name: Room.name })
  room!: Types.ObjectId;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
