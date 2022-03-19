import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { MongoEntity } from "../common";
import { Room } from "../rooms/room.schema";
import { User } from "../users/user.schema";

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message extends MongoEntity {
  @Prop({ type: Types.ObjectId, ref: Room.name, required: true })
  sender!: Types.ObjectId;
  @Prop({ required: true })
  content!: string;
  @Prop({ type: Types.ObjectId, ref: Room.name, required: true })
  room!: Types.ObjectId;
}
export interface PopulatedMessage extends Omit<Message, 'sender' | 'room'> {
  sender: User;
  room: Room;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
