import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Restaurant } from './entities/restaurant.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Restaurant, User])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService]
})
export class RestaurantsModule { }