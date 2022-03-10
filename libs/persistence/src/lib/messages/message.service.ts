import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { MessageDto } from './message.dto';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessagePersistenceService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) { }

  async create(createMessageDto: MessageDto): Promise<Message> {
    const createdMessage = new this.messageModel(
      {
        ...createMessageDto,
        room: new Types.ObjectId(createMessageDto.room.id),
        _id: new Types.ObjectId()
      });
    return createdMessage.save();
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }
}
