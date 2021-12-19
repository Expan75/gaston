import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class UsersService {
  constructor(private readonly em: EntityManager) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.em.create(User, createUserDto);
    await this.em.persist(user).flush();
    return user;
  }

  async findAll() {
    const users = await this.em.find(User, {});
    return users;
  }

  async findOne(uuid: string) {
    const user = await this.em.findOne(User, { uuid: uuid });
    return user;
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(uuid);
    if (user) {
      Object.assign(user, updateUserDto);
      await this.em.flush();
      return user;
    } else {
      throw new InternalServerErrorException(
        `Failed to update user as none with uuid=${uuid} exist.`,
      );
    }
  }

  async remove(uuid: string) {
    const existingUser = await this.findOne(uuid);
    if (existingUser) {
      await this.em.remove(existingUser).flush();
    } else {
      throw new InternalServerErrorException(
        `Failed to remove user as none with uuid=${uuid} exist.`,
      );
    }
  }
}
