import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginInput, LoginResult, RefreshTokenInput, RefreshTokenResult } from './auth.dto';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common'
import { JwtToken } from './auth.types';

@Resolver(() => LoginResult)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResult)
  async login(@Args('loginInput') loginInput: LoginInput): Promise<JwtToken> {
    const user = await this.authService.authenticate(
      loginInput.email, loginInput.password
    );
    console.log(user)
    
    if (user) {
      const signedToken = await this.authService.login(user)
      return signedToken
    }
    throw new UnauthorizedException('invalid user credentials')
  }

  @Mutation(() => RefreshTokenResult)
  async refreshToken(@Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput): Promise<{access_token: string}> {
    return await this.authService.refresh(refreshTokenInput)
  }
}