import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { DbUser } from "@oursocial/persistence";
import { Document, Types } from 'mongoose';
import { DbRoom } from "../chat";
import { MongoEntity } from "../common";
export type EventDocument = Event & Document;

@Schema({ timestamps: true })
class Event extends MongoEntity {
  @Prop({ required: true })
  name!: string;
  @Prop({ type: Types.ObjectId, ref: DbUser.name, required: true })
  organizer!: Types.ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: DbUser.name, required: true }] })
  attendants!: Types.ObjectId[];
  @Prop({ required: true })
  takesPlaceOn!: Date;
  @Prop({ type: Types.ObjectId, ref: DbRoom.name, required: true })
  room!: Types.ObjectId;
}
export const EventSchema = SchemaFactory.createForClass(Event);
export { Event as DbEvent };
