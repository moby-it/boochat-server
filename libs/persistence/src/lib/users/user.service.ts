import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateUserDto, UserDto } from './user.dto';
import { DbUser, UserDocument } from './user.schema';
@Injectable()
export class UserPersistenceService {
  constructor(@InjectModel(DbUser.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: CreateUserDto): Promise<UserDto> {

    const createdUser = new this.userModel({ _id: new Types.ObjectId(), ...createUserDto });
    return createdUser.save();
  }

  async findAll(): Promise<UserDto[]> {
    return await this.userModel.find().exec();
  }
  async findById(id: string): Promise<UserDto | null> {
    return await this.userModel.findOne({ _id: new Types.ObjectId(id) }).exec();
  }
  async findByGoogleId(googleIds: string[]): Promise<UserDto[]> {
    return await this.userModel.find({ googleId: { $in: googleIds } }).exec();
  }
  async findOneByGoogleId(googleId: string): Promise<UserDto | undefined> {
    return await this.userModel.findOne({ googleId }).exec() as UserDocument;

  }
  async update(id: string, userDto: UserDto): Promise<void> {
    await this.userModel.updateOne({ _id: new Types.ObjectId(id) }, { ...userDto });
  }
}
