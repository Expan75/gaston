import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PasswordStrippedUser } from '../../users/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }
  
  async validate(username: string, password: string): Promise<PasswordStrippedUser> {
    const user = await this.authService.authenticate(username, password);
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException();
    }
  }
}