import { Prop } from '@nestjs/mongoose';
export abstract class MongoEntity {
  @Prop({ required: true })
  _id!: string;
  @Prop({ required: true })
  createdAt!: Date;
  get id() {
    return this._id;
  }
}
