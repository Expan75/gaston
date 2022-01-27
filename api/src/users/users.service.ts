import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async create(createUserInput: CreateUserInput) {
    const createdUser = await this.userModel.create(createUserInput);
    return createdUser
  }

  async findAll() {
    const users = await this.userModel.find()
    return users
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id)
    return user
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserInput, { new: true })
    return updatedUser
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id)
    return deletedUser
  }
};