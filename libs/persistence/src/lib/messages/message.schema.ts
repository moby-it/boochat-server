import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Document } from 'mongoose';
import { BaseDbEntity } from "../common/base.entity";
import { Room } from "../rooms/room.schema";
export type MessageDocument = Message & Document;

@Schema()
export class Message extends BaseDbEntity {
    @Prop()
    sender: string;
    @Prop()
    receiver: string;
    @Prop()
    content: string;
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true })
    room: Room;
}
export const MessageSchema = SchemaFactory.createForClass(Message);
