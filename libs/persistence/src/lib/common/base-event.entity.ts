import { Prop } from "@nestjs/mongoose";
import { MongoEntity } from "./base.entity";
export class BaseEvent<EventType> extends MongoEntity {
  @Prop({ required: true })
  userId!: string;
  @Prop({ required: true })
  type!: EventType;
}
