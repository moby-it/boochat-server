import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MongoEntity } from '../common';
export type UserDocument = User & Document;

@Schema()
export class User extends MongoEntity {
  @Prop({ required: true })
  name!: string;
  @Prop({ required: true })
  imageUrl!: string;
}
export const UserSchema = SchemaFactory.createForClass(User);

export const USERS_COLLECTION_NAME = 'Users';
