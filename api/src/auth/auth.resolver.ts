import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '../common/current-user-decorator';
import { AuthInput, AuthResult, RefreshTokenInput } from './auth.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => AuthResult)
  async login(
    @CurrentUser() user,
    @Args('input') input: AuthInput,
  ): Promise<AuthResult> {
    console.log("user tried logging, user: ", user)
    return await this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => AuthResult)
  async refreshToken(
    @CurrentUser() user,
    @Args('input') input: RefreshTokenInput,
  ): Promise<AuthResult> {
    console.log("user tried refreshing token, user: ", user)
    // return await this.authService.refreshToken({refreshToken});
    return { access_token: "somekind of refresh token" }
  }
}
