import { Prop } from "@nestjs/mongoose";
import { Types } from 'mongoose';
export abstract class BaseEntity {
  @Prop({ auto: true })
  _id!: Types.ObjectId;
  @Prop()
  createdAt!: Date;
  @Prop()
  updatedAt!: Date;
  get id() {
    return this._id.toString();
  }
}
