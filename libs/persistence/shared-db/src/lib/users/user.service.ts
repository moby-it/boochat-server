import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { SHARED_DB_CONNECTION_NAME } from '../common';
import { CreateUserDto, UserDto } from '@boochat/domain';
import { User, UserDocument } from './user.schema';
@Injectable()
export class UserPersistenceService {
  userModel: Model<UserDocument>;
  constructor(@InjectConnection(SHARED_DB_CONNECTION_NAME) connection: Connection) {
    this.userModel = connection.model(User.name);
  }

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel({
      _id: uuid(),
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
  async findByGoogleId(googleIds: string[]): Promise<UserDocument[]> {
    return await this.userModel.find({ googleId: { $in: googleIds } }).exec();
  }
  async findOneByGoogleId(googleId: string): Promise<UserDocument | undefined> {
    return (await this.userModel.findOne({ googleId }).exec()) as UserDocument;
  }
  async update(id: string, userDto: UserDto): Promise<void> {
    await this.userModel.updateOne({ _id: id }, { ...userDto });
  }
}
