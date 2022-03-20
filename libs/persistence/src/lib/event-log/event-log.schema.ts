import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from 'mongoose';
import { User } from "../users";
import { EventsEnum } from "./events.enum";

export type EventLogDocument = EventLog & Document;

@Schema()
export class EventLog {
  @Prop({ type: Number, required: true })
  type!: EventsEnum;
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  user!: Types.ObjectId;

  @Prop({ required: true })
  timestamp!: Date;
  @Prop({ type: Object })
  payload?: unknown;
}
export const EventLogSchema = SchemaFactory.createForClass(EventLog);
