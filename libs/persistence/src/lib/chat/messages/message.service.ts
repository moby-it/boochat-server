import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageDto } from './message.dto';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessagePersistenceService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) { }

  async create({ content, sender, room }: MessageDto): Promise<MessageDocument> {
    const createdMessage = new this.messageModel(
      {
        sender: new Types.ObjectId(sender),
        content,
        room: new Types.ObjectId(room.id)
      });
    return (await createdMessage.save()).populate('room');
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }
}
