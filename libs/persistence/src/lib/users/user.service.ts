import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Email } from '@oursocial/domain';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { CreateUserDto } from './user.dto';
import { User, UserDocument } from './user.schema';
@Injectable()
export class UserPersistenceService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {

        const createdUser = new this.userModel({ ...createUserDto, _id: uuid() });
        return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }
    async findOneByEmail(email: Email): Promise<User> {
        return await this.userModel.findOne({ email: email.value }).exec();
    }
}
