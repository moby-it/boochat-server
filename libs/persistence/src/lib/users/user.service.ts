import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto } from './user.dto';
import { User, UserDocument } from './user.schema';
@Injectable()
export class UserPersistenceService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {

    const createdUser = new this.userModel({ ...createUserDto, _id: new Types.ObjectId() });
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }
  async findOneByGoogleId(googleId: string): Promise<User | null> {
    return await this.userModel.findOne({ googleId }).exec();
  }
}
