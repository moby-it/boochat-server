import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MongoEntity } from '../common';
import { AlertDocument } from './alerts';
import { PollDocument } from './polls/poll.schema';
import { Attendance } from './rsvps/rsvp';
export type MeetupDocument = Meetup & Document;
@Schema({
  timestamps: true
})
export class Meetup extends MongoEntity {
  @Prop({ required: true })
  name!: string;
  @Prop({ required: true })
  organizerId!: string;
  @Prop({ required: true })
  location!: string;
  @Prop({ type: Types.Array, required: true })
  attendeeIds!: string[];
  @Prop()
  takesPlaceOn!: Date;
  @Prop({ required: true })
  roomId!: string;
  @Prop({ type: Types.ArraySubdocument, default: [] })
  polls!: PollDocument[];
  @Prop({ type: Types.ArraySubdocument, default: [] })
  alerts!: AlertDocument[];
  @Prop({ type: Types.Array })
  attendance!: Attendance[];
}

export const MeetupSchema = SchemaFactory.createForClass(Meetup);
export const MEETUP_COLLECTION_NAME = 'Meetups';
