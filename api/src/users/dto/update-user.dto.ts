import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsNotEmpty } from 'class-validator';
import { Role } from '../entities/user.entity';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  password?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  name?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  role?: [Role];
}
