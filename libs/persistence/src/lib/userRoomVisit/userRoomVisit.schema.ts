import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { Room } from "../rooms";
import { User } from "../users";

export type UserRoomVisitDocument = UserRoomVisit & Document;

@Schema()
export class UserRoomVisit {
  @Prop({ auto: true })
  _id!: Types.ObjectId;
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user!: Types.ObjectId;
  @Prop({ required: true, type: Types.ObjectId, ref: Room.name })
  room!: Types.ObjectId;
  @Prop({ required: true })
  timestamp!: Date;
}
export const UserRoomVisitSchema = SchemaFactory.createForClass(UserRoomVisit);
