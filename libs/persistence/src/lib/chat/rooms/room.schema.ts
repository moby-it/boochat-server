import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { BaseEntity } from "../../common";
import { User } from "../../users/user.schema";
export type RoomDocument = Room & Document;
@Schema({ timestamps: true })
export class Room extends BaseEntity {
  @Prop({ required: true })
  name!: string;

  @Prop([{ type: Types.ObjectId, ref: User.name }])
  users!: Types.ObjectId[];
}
export const RoomSchema = SchemaFactory.createForClass(Room);
