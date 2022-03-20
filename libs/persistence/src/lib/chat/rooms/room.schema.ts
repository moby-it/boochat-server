import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { MongoEntity } from "../../common";
import { DbUser } from "../../users";
import { MessageDocument } from "../messages";
export type RoomDocument = Room & Document;

export type PopulatedRoomDocument = RoomDocument & { messages: MessageDocument[]; };
@Schema({ timestamps: true })
class Room extends MongoEntity {
  @Prop({ required: true })
  name!: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: DbUser.name, required: true }] })
  users!: Types.ObjectId[];
}
export const RoomSchema = SchemaFactory.createForClass(Room);
export { Room as DbRoom };
