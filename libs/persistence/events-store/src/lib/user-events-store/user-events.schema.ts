import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEvent } from '../common/base-event.entity';
export type UserEventDocument = UserEvent & Document;

@Schema({
  strict: false
})
export class UserEvent extends BaseEvent {}

export const UserEventSchema = SchemaFactory.createForClass(UserEvent);

export const USER_EVENTS_COLLECTION_NAME = 'UserEventsStore';
