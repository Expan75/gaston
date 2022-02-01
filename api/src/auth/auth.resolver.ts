import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthResult } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtToken } from './auth.types';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '../common/current-user-decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthResult)
  async login(
    @CurrentUser() user,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<JwtToken> {
    return await this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AuthResult)
  async refreshToken(
    @CurrentUser() user,
    @Args('refreshToken') refreshToken: string,
  ): Promise<JwtToken> {
    return await this.authService.refreshToken(refreshToken);
  }
}
