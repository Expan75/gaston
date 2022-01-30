import { Request, UseGuards, UnauthorizedException } from '@nestjs/common'
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthInput, AuthResult, RefreshTokenInput } from './auth.dto';
import { AuthService } from './auth.service';
import { JwtToken } from './auth.types';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '../common/current-user-decorator';
import { User } from 'src/users/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResult)
  async login(@Args('authInput') authInput: AuthInput): Promise<JwtToken> {
    const user = await this.authService.authenticate(
      authInput.email, authInput.password
    );
    
    if (user) {
      return await this.authService.login(user)
    }
    throw new UnauthorizedException('invalid user credentials')
  }

  @Mutation(() => AuthResult)
  async refreshToken(@Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput): Promise<{access_token: string}> {
    return await this.authService.refresh(refreshTokenInput)
  }
}