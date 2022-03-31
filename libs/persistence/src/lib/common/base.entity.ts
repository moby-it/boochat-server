import { Prop } from "@nestjs/mongoose";
export abstract class MongoEntity {
  @Prop({ required: true })
  id!: string;
  @Prop({ required: true })
  createdAt!: Date;
}
