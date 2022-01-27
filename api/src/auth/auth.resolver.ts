import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { LoginInput, LoginResult } from './auth.dto';
import { AuthService } from './auth.service';

@Resolver(() => LoginResult)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResult)
  async login(@Args('loginInput') loginInput: LoginInput) {
    const user = await this.authService.authenticate(
      loginInput.email, loginInput.password
    );
    return user
  }
}