import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { BaseDbEntity } from "../common/base.entity";
export type UserDocument = User & Document;

@Schema()
export class User extends BaseDbEntity {
  @Prop({ required: true })
  googleId: string;
  @Prop({ required: true })
  name: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
