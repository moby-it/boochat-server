import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMessageDto } from './message.dto';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessagePersistenceService {
    constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) { }

    async create(createMessageDto: CreateMessageDto): Promise<Message> {
        const createdMessage = new this.messageModel(createMessageDto);
        return createdMessage.save();
    }

    async findAll(): Promise<Message[]> {
        return this.messageModel.find().exec();
    }
}
