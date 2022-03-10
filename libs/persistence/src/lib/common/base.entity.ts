import { Prop } from "@nestjs/mongoose";
import { Types } from 'mongoose';
export abstract class BaseDbEntity {
  @Prop()
  _id: Types.ObjectId;
  @Prop({ default: Date.now() })
  timestamp: Date;

}
