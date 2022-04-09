import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEvent } from '../common/base-event.entity';
export type MeetupEventDocument = MeetupEvent & Document;

@Schema({
  strict: false
})
export class MeetupEvent extends BaseEvent {}
export const MeetupEventSchema = SchemaFactory.createForClass(MeetupEvent);

export const MEETUP_EVENTS_COLLECTION_NAME = 'MeetupEventsStore';
