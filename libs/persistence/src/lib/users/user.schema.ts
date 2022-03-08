import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { BaseEntity } from "../common/base.entity";
export type UserDocument = User & Document;

@Schema()
export class User extends BaseEntity {
    @Prop()
    email: string;
}
export const UserSchema = SchemaFactory.createForClass(User);