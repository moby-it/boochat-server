import { Prop } from "@nestjs/mongoose";

export abstract class BaseEntity {
  @Prop()
  createdAt!: Date;
  @Prop()
  updatedAt!: Date;
}
