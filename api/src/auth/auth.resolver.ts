import { UseGuards } from '@nestjs/common';
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
} from './auth.dto';
import { LocalAuthGuard } from './guards/local.guard';

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

  @Mutation(() => RefreshTokenResult)
  async refreshToken(
    @CurrentUser() user,
    @Args('input') input: RefreshTokenInput,
  ): Promise<RefreshTokenResult> {
    const accessToken = await this.authService.getAccessToken(user);
    return {
      accessToken: accessToken,
    };
  }
}
