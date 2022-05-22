import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { CreateUserDto, UserDto } from '@boochat/domain';
import { User, UserDocument } from './user.schema';
import { READ_DB_CONNECTION_NAME } from '../common';

@Injectable()
export class UserRepository {
  userModel: Model<UserDocument>;
  constructor(@InjectConnection(READ_DB_CONNECTION_NAME) connection: Connection) {
    this.userModel = connection.model(User.name);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel({
      _id: createUserDto.id,
      ...createUserDto,
      createdAt: new Date()
    });
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find({}).exec();
  }
  async findById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ _id: id }).exec();
  }
  async update(id: string, userDto: UserDto): Promise<void> {
    await this.userModel.updateOne({ _id: id }, { ...userDto });
  }
}
