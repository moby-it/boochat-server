import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { User } from "../../users";
import { RsvpEnum } from "./rsvp.enum";

export type AttendeeDocument = Attendee & Document;

@Schema()
export class Attendee {

  @Prop({ type: { type: Types.ObjectId, ref: User.name, required: true } })
  user!: Types.ObjectId;
  @Prop({ required: true })
  rsvp!: RsvpEnum;
}
export const AttendeeSchema = SchemaFactory.createForClass(Attendee);
