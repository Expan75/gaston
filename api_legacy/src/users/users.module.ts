import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';

@Module({
  imports: [MikroOrmModule.forFeature([User, Restaurant])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule { }