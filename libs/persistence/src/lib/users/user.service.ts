import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Result, UserId } from '@oursocial/domain';
import { Model, Types } from 'mongoose';
import { UserDto } from './user.dto';
import { User, UserDocument } from './user.schema';
@Injectable()
export class UserPersistenceService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

  async create(createUserDto: UserDto): Promise<UserDocument> {

    const createdUser = new this.userModel({ ...createUserDto });
    return createdUser.save();
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }
  async findById(id: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ _id: new Types.ObjectId(id) }).exec();
  }
  async findByGoogleId(googleIds: string[]): Promise<UserDocument[]> {
    return await this.userModel.find({ googleId: { $in: googleIds } }).exec();
  }
  async findOneByGoogleId(googleId: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ googleId }).exec();
  }
  async update(id: string, userDto: UserDto): Promise<Result<undefined>> {
    try {
      const result = await this.userModel.updateOne({ _id: new Types.ObjectId(id) }, { ...userDto });
      if (result.matchedCount === 1) return Result.success();
      return Result.fail('Failed to update');
    } catch (e) {
      return Result.fail(e);
    }


  }
}
