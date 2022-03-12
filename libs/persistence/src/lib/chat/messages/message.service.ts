import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User } from '../../users/user.schema';
import { Room } from '../rooms/room.schema';
import { MessageDto } from './message.dto';
import { Message, MessageDocument, PopulatedMessageDocument } from './message.schema';

@Injectable()
export class MessagePersistenceService {
  constructor(@InjectModel(Message.name) private messageModel: Model<MessageDocument>) { }
  private readonly populateUserOptions = { path: 'sender', model: User.name };
  private readonly populateRoomOptions = { path: 'room', model: Room.name };
  async create(messageDto: MessageDto): Promise<MessageDocument> {
    const { content, sender, room } = messageDto;
    const createdMessage = new this.messageModel(
      {
        sender: new Types.ObjectId(sender),
        content,
        room: new Types.ObjectId(room.id)
      });
    await createdMessage.save();
    return createdMessage;
  }
  async populateMessage(message: MessageDocument): Promise<PopulatedMessageDocument> {
    return await message.populate([this.populateRoomOptions, this.populateUserOptions]);
  }
  async findByRoomId(roomId: string): Promise<MessageDocument[]> {
    return await this.messageModel.find({ room: new Types.ObjectId(roomId) });
  }
  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }
}
