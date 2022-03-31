import { Prop } from "@nestjs/mongoose";
import { MongoEntity } from "./base.entity";
export class BaseEvent<T> extends MongoEntity {
  @Prop({ required: true })
  userId!: string;
  @Prop({ required: true })
  type!: number;
  @Prop({ required: true })
  name!: T;
}
