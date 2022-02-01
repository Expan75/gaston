import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args, Context, GraphQLExecutionContext } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '../common/current-user-decorator';
import { LoginInput, LoginResult, RefreshTokenInput, RefreshTokenResult } from './auth.dto';
import JwtRefreshGuard from './guards/jwt-refresh-auth.guard';

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
    @Context() context: GraphQLExecutionContext,
  ): Promise<LoginResult> {
    console.log('login user: ', user)
    const accessToken = await this.authService.getAccessToken(user);
    const refreshToken = await this.authService.getRefreshToken(user._id);
    this.usersService.setRefreshToken(refreshToken, user._id);

    // Ideally, should also set cookies (similar to rest): req.res.setHeader('Set-Cookie', [accessToken, refreshToken]);
    // NOTE: that this behaviour is difficult to get right: https://github.com/benjsicam/nestjs-graphql-microservices/blob/master/api-gateway/src/auth/user.decorator.ts
    // Instead, let's just transfer the problem to the client side
    return { 
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  // @UseGuards(JwtAuthGuard)
  @UseGuards(JwtRefreshGuard)
  @Mutation(() => RefreshTokenResult)
  async refreshToken(
    @CurrentUser() user,
    @Args('input') input: RefreshTokenInput,
  ): Promise<RefreshTokenResult> {
    const accessToken = await this.authService.getAccessToken(user);
    return {
      access_token: accessToken,
    }
  }
}
