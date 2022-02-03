import { UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import {
  Resolver,
  Mutation,
  Args,
  Context,
  GraphQLExecutionContext,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CurrentUser } from '../common/current-user-decorator';
import {
  LoginInput,
  LoginResult,
  RefreshTokenInput,
  RefreshTokenResult,
  LogoutInput,
  LogoutResult,
} from './auth.dto';
import { LocalAuthGuard } from './guards/local.guard';
import { JwtRefreshTokenGuard } from './guards/refresh.guard';
import { JwtAccessTokenGuard } from './guards/auth.guard';
import { assert } from 'console';

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
    const accessToken = await this.authService.getAccessToken(user);
    const refreshToken = await this.authService.getRefreshToken(user);
    await this.usersService.setRefreshToken(refreshToken, user._id);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  @UseGuards(JwtAccessTokenGuard)
  @Mutation(() => LogoutResult)
  async logout(
    @CurrentUser() user,
    @Args('input') input: LogoutInput,
  ): Promise<LogoutResult> {
    await this.usersService.resetRefreshToken(user._id);
    return { message: 'logout successful' }
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Mutation(() => RefreshTokenResult)
  async refreshToken(
    @CurrentUser() user,
    @Args('input') input: RefreshTokenInput,
  ): Promise<RefreshTokenResult> {
    const refreshTokenMatches = await this.usersService.verifyMatchingRefreshToken(input.refreshToken, user._id)
    if (refreshTokenMatches) {
      const accessToken = await this.authService.getAccessToken(user);
      return {
        accessToken: accessToken,
      };
    } else {
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: 'Please submit a valid refresh token',
      }, HttpStatus.FORBIDDEN);
    }
  }
}
