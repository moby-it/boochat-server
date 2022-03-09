import { Prop } from "@nestjs/mongoose";
import { Types } from 'mongoose';
export abstract class BaseEntity {
    @Prop()
    _id: Types.ObjectId;
    @Prop({ default: Date.now() })
    timestamp: Date;

}