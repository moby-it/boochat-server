import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from 'mongoose';
import { Room } from "../chat";
import { MongoEntity } from "../common";
import { User } from "../users";
export type MeetupDocument = Meetup & Document;

@Schema({ timestamps: true })
export class Meetup extends MongoEntity {
  @Prop({ required: true })
  name!: string;
  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  organizer!: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: User.name, required: true }] })
  attendees!: Types.ObjectId[];
  @Prop({ required: true })
  takesPlaceOn!: Date;
  @Prop({ type: Types.ObjectId, ref: Room.name, required: true })
  room!: Types.ObjectId;
}
export const MeetupSchema = SchemaFactory.createForClass(Meetup);
