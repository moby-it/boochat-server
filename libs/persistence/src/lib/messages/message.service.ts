import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Result } from '@oursocial/domain';
import { Model, Types } from 'mongoose';
import { User } from '../users/user.schema';
import { Room } from '../rooms/room.schema';
import { MessageDto, PopulatedMessage } from './message.dto';
import { Message, MessageDocument } from './message.schema';

@Injectable()
export class MessagePersistenceService {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) { }
  private readonly populateUserOptions = { path: 'sender', model: User.name };
  private readonly populateRoomOptions = { path: 'room', model: Room.name };
  async create(messageDto: MessageDto): Promise<Message> {
    const { content, sender, room } = messageDto;
    const createdMessage = new this.messageModel(
      {
        _id: new Types.ObjectId(),
        sender: new Types.ObjectId(sender),
        content,
        room: new Types.ObjectId(room.id)
      });
    await createdMessage.save();
    return createdMessage;
  }
  async populateMessage(message: Message): Promise<Result<PopulatedMessage | undefined>> {
    try {
      const dbMessage = await this.messageModel.findOne({ _id: new Types.ObjectId(message._id) });
      if (dbMessage) {
        const populatedMessage = await dbMessage.populate([this.populateRoomOptions, this.populateUserOptions]) as PopulatedMessage;
        return Result.success(populatedMessage);
      }
      return Result.fail('no message found');
    } catch (e) {
      return Result.fail(e);
    }


  }
  async findByRoomId(roomId: string): Promise<MessageDocument[]> {
    return await this.messageModel.find({ room: new Types.ObjectId(roomId) });
  }
  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }
}
