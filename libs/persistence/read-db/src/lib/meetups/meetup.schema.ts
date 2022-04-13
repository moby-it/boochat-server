import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MongoEntity } from '../common';
import { MeetupAlert } from './meetup-alert';
import { Poll } from './polls/poll.schema';
export type MeetupDocument = Meetup & Document;
@Schema({
  timestamps: true
})
export class Meetup extends MongoEntity {
  @Prop({ required: true })
  name!: string;
  @Prop({ required: true })
  organizer!: string;
  @Prop({ required: true })
  location!: string;
  @Prop({ required: true })
  attendantIds!: string[];
  @Prop()
  takesPlaceOn!: Date;
  @Prop({ required: true })
  roomId!: string;
  @Prop({ type: Types.ArraySubdocument })
  polls!: Poll[];
  @Prop({ type: Object })
  alerts!: MeetupAlert;
}

export const MeetupSchema = SchemaFactory.createForClass(Meetup);
export const MEETUP_COLLECTION_NAME = 'Meetups';
