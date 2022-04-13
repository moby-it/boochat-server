import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MongoEntity } from '../common';
import { AlertDocument } from './alerts';
import { PollDocument } from './polls/poll.schema';
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
  @Prop({ required: true })
  attendeeIds!: string[];
  @Prop()
  takesPlaceOn!: Date;
  @Prop({ required: true })
  roomId!: string;
  @Prop({ type: Types.ArraySubdocument })
  polls!: PollDocument[];
  @Prop({ type: Types.ArraySubdocument })
  alerts!: AlertDocument[];
}

export const MeetupSchema = SchemaFactory.createForClass(Meetup);
export const MEETUP_COLLECTION_NAME = 'Meetups';
