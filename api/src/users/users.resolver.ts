import { ValidationPipe, UsePipes, UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { CreateUserInput, UpdateUserInput } from './user.dto';
import { JwtAccessTokenGuard } from '../auth/guards/auth.guard';
import { UsersService } from './users.service';
import { User } from './user.entity';

@UseGuards(JwtAccessTokenGuard)
@UsePipes(ValidationPipe)
@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const createdUser = await this.usersService.create(createUserInput);
    return createdUser;
  }

  @Query(() => [User], { name: 'users' })
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => ID }) id: string) {
    const user = await this.usersService.findOne(id);
    return user;
  }

  @Mutation(() => User)
  async updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    const updatedUser = await this.usersService.update(
      updateUserInput.id,
      updateUserInput,
    );
    return updatedUser;
  }

  @Mutation(() => User)
  async removeUser(@Args('id', { type: () => ID }) id: string) {
    const removedUser = await this.usersService.remove(id);
    return removedUser;
  }
}
