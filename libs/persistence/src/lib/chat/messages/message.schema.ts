import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { MongoEntity } from "../../common";
import { DbUser } from "../../users";
import { DbRoom } from "../rooms/room.schema";

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
class Message extends MongoEntity {
  @Prop({ type: Types.ObjectId, ref: DbRoom.name, required: true })
  sender!: Types.ObjectId;
  @Prop({ required: true })
  content!: string;
  @Prop({ type: Types.ObjectId, ref: DbRoom.name, required: true })
  room!: Types.ObjectId;
}
export interface PopulatedDbMessage extends Omit<Message, 'sender' | 'room'> {
  sender: DbUser;
  room: DbRoom;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
export { Message as DbMessage };
