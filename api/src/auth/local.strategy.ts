import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordStrippedUser } from '../users/user.entity';
import { AuthService } from './auth.service';

type AccessToken = { token: string }

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }
  
  async validate(username: string, password: string): Promise<PasswordStrippedUser> {
    const user = await this.authService.authenticate(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  // for JWT integration
  async login(user: PasswordStrippedUser): Promise<AccessToken> {
    return { token: "" }
  }

  // for JWT integration (needs types)
  async verify(accessToken: AccessToken): Promise<any> {
    return { email: "email@email.com" }
  }
}