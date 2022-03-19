import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { MongoEntity } from "../common";
import { MessageDocument } from "../messages";
import { User } from "../users/user.schema";
export type RoomDocument = Room & Document;

export type PopulatedRoomDocument = RoomDocument & { messages: MessageDocument[]; };
@Schema({ timestamps: true })
export class Room extends MongoEntity {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  users!: Types.ObjectId[];
}
export const RoomSchema = SchemaFactory.createForClass(Room);
