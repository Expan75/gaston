import { Request, UseGuards, UnauthorizedException } from '@nestjs/common'
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthInput, AuthResult, RefreshTokenInput } from './auth.dto';
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
  async login(@CurrentUser() user, @Args('input') authInput: AuthInput): Promise<JwtToken> {
    console.log('current user (login):', user)
    return await this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AuthResult)
  async refreshToken(@CurrentUser() user, @Args('input') refreshTokenInput: RefreshTokenInput): Promise<{access_token: string}> {
    console.log('current user (refreshToken):', user)
    return await this.authService.refresh(refreshTokenInput)
  }
}