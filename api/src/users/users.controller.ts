import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const createdUser = await this.usersService.create(createUserDto);
    return createdUser;
  }

  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return users;
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string) {
    const user = await this.usersService.findOne(uuid);
    return user;
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.update(uuid, updateUserDto);
    return updatedUser;
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string) {
    await this.usersService.remove(uuid);
  }
}
