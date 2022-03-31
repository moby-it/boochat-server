import { Prop } from "@nestjs/mongoose";
import { MongoEntity } from "./base.entity";
export abstract class BaseEvent extends MongoEntity {
  @Prop({ required: true })
  userId!: string;
  @Prop({ required: true })
  type!: number;
  @Prop({ required: true })
  name!: string;
}
