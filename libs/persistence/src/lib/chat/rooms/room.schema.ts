import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { BaseEntity } from "../../common";
import { User } from "../../users/user.schema";
import { Message, MessageDocument } from "../messages";
export type RoomDocument = Room & Document;
export type RoomDocumentWithLastMessage = RoomDocument & { lastMessage: Message; };

export type PopulatedRoomDocument = RoomDocument & { messages: MessageDocument[]; };
@Schema({ timestamps: true })
export class Room extends BaseEntity {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name }] })
  users!: Types.ObjectId[];
}
export const RoomSchema = SchemaFactory.createForClass(Room);
