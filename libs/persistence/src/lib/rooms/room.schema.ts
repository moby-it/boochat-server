import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { BaseEntity } from '../common/base.entity';
export type RoomDocument = Room & Document;
@Schema()
export class Room extends BaseEntity {
    @Prop({ required: true })
    name: string;
}
export const RoomsSchema = SchemaFactory.createForClass(Room);