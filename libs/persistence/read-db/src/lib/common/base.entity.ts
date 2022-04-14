import { Prop } from '@nestjs/mongoose';
export abstract class MongoEntity {
  @Prop({ required: true })
  _id!: string;
  createdAt!: Date;
  updatedAt!: Date;
  get id() {
    return this._id;
  }
}
