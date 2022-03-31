import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
import { BaseEvent } from "../common/base-event.entity";
import { RoomEventType } from "@oursocial/domain";
export type RoomEventDocument = RoomEvent & Document;

@Schema()
export class RoomEvent extends BaseEvent<RoomEventType> { }
export const RoomEventSchema = SchemaFactory.createForClass(RoomEvent);

export const ROOM_EVENTS_COLLECTION_NAME = 'RoomEventsStore';
