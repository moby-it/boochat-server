import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { MongoEntity } from "../common";
export type UserDocument = User & Document;

@Schema({ timestamps: true })
export class User extends MongoEntity {
  @Prop({ required: true })
  googleId!: string;
  @Prop({ required: true })
  name!: string;
}
export const UserSchema = SchemaFactory.createForClass(User);
