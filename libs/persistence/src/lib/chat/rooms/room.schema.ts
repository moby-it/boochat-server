import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { BaseEntity } from "../../common";
import { MessageDocument } from "../messages";
export type RoomDocument = Room & Document;
export type RoomDocumentWithLastMessage = RoomDocument & { lastMessage: MessageDocument; };
export class RoomUser {
  userId!: Types.ObjectId;
  lastVisited?: Date;
}
export type PopulatedRoomDocument = RoomDocument & { messages: MessageDocument[]; };
@Schema({ timestamps: true })
export class Room extends BaseEntity {
  @Prop({ required: true })
  name!: string;

  @Prop()
  users!: RoomUser[];
}
export const RoomSchema = SchemaFactory.createForClass(Room);
