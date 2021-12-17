import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { instanceToPlain, plainToInstance, plainToClassFromExist } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  private users: User[] = []

  create(createUserDto: CreateUserDto) {
    const userProperties = instanceToPlain(createUserDto);
    const user = plainToInstance(User, userProperties);
    this.users.push(user);
    console.log(this.users)
    return user;
  };

  findAll() {
    return this.users;
  };

  findOne(uuid: string) {
    return this.users.find(user => user.uuid === uuid);
  };

  update(uuid: string, updateUserDto: UpdateUserDto) {
    const existingUser = this.findOne(uuid)
    if (existingUser) {
      const updatedUser = plainToClassFromExist(existingUser, updateUserDto)
      this.users[this.users.indexOf(existingUser)] = updatedUser
      return updatedUser
    } else {
      throw new InternalServerErrorException(`Failed to update user as none with uuid=${uuid} exist.`)
    }
  };

  remove(uuid: string) {
    const existingUser = this.findOne(uuid)
    if (existingUser) {
      this.users = this.users.filter(user => user.uuid !== uuid)
      return true
    } else {
      throw new InternalServerErrorException(`Failed to remove user as none with uuid=${uuid} exist.`)
    }
  };
}
