import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { BaseEvent } from '../common/base-event.entity';
export type RoomEventDocument = RoomEvent & Document;

@Schema({
  strict: false
})
export class RoomEvent extends BaseEvent {}

export const RoomEventSchema = SchemaFactory.createForClass(RoomEvent);

export const ROOM_EVENTS_COLLECTION_NAME = 'RoomEventsStore';
