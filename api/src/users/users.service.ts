import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User, UserDocument } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserInput: CreateUserInput) {
    const hashedPassword: string = await bcrypt.hash(
      createUserInput.password,
      10,
    );
    createUserInput.password = hashedPassword;
    const createdUser = await this.userModel.create(createUserInput);
    return createdUser;
  }

  async findAll() {
    // re: use of lean(), see: https://stackoverflow.com/questions/7503450/how-do-you-turn-a-mongoose-document-into-a-plain-object
    const users = await this.userModel.find().lean();
    return users;
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id).lean();
    return user;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email }).lean();
    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    if (updateUserInput.password) {
      const hashedPassword = await bcrypt.hash(updateUserInput.password, 10);
      updateUserInput.password = hashedPassword;
    }
    const updatedUser = await this.userModel
      .findByIdAndUpdate(id, updateUserInput, { new: true })
      .lean();
    return updatedUser;
  }

  async remove(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id).lean();
    return deletedUser;
  }

  async setRefreshToken(refreshToken: string, userId: string) {
    const hashedRefreshToken: string = await bcrypt.hash(refreshToken, 10);
    await this.userModel
      .findByIdAndUpdate(
        userId,
        { refreshToken: hashedRefreshToken },
        { new: true },
      )
      .lean();
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.findOne(userId);
    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshToken,
    );
    if (isRefreshTokenMatching) {
      return user;
    }
  }
}
