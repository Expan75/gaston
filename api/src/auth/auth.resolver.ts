import { UseGuards, Request } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from '../common/current-user-decorator';
import { LoginInput, LoginResult, RefreshTokenInput, RefreshTokenResult } from './auth.dto';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResult)
  async login(
    @CurrentUser() user,
    @Args('input') input: LoginInput,
  ): Promise<LoginResult> {
    console.log('login user: ', user)
    const accessToken = await this.authService.getAccessToken(user);
    const refreshToken = await this.authService.getRefreshToken(user._id);
    this.usersService.setRefreshToken(refreshToken, user._id);

    return { 
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => RefreshTokenResult)
  async refreshToken(
    @CurrentUser() user,
    @Args('input') input: RefreshTokenInput,
  ): Promise<RefreshTokenResult> {
    const freshAccessToken = await this.authService.getRefreshToken(user.sub);
    return {
      access_token: freshAccessToken,
    }
  }
}
