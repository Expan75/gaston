import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginInput, LoginResult } from './auth.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Resolver(() => LoginResult)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginResult)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.authenticate(
      loginInput.email, loginInput.password
    );
    return user
  }
}