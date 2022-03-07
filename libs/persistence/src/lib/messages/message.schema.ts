import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';
export type MessageDocument = Message & Document;

@Schema()
export class Message {
    @Prop()
    sender: string;
    @Prop()
    receiver: string;
    @Prop()
    timestamp: Date;
    @Prop()
    content: string;
    @Prop({ required: true })
    roomId: string;
}
export const MessageSchema = SchemaFactory.createForClass(Message);