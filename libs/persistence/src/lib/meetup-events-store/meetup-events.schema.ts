import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { BaseEvent } from "../common/base-event.entity";
import { MeetupEventType } from "@oursocial/domain";
export type MeetupEventDocument = MeetupEvent & Document;

@Schema()
export class MeetupEvent extends BaseEvent<MeetupEventType> { }
export const MeetupEventSchema = SchemaFactory.createForClass(MeetupEvent);

export const MEETUP_EVENTS_COLLECTION_NAME = 'MeetupEventsStore';
