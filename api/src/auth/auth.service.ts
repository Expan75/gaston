import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordStrippedUser } from '../users/user.entity';
import { LoginResult } from './auth.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async authenticate(
    email: string,
    clearTextPassword: string,
  ): Promise<PasswordStrippedUser | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      const passwordMatches = await bcrypt.compare(
        clearTextPassword,
        user.password,
      );
      if (passwordMatches) {
        const { password, ...passwordStrippedUser } = user;
        return passwordStrippedUser;
      }
    }
    return null;
  }

  async getAccessToken(user: any): Promise<string> {
    // sub contains identify in accordanec /w jwt spec
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  async getRefreshToken(userId: string): Promise<string> {
    const payload = { email: 'fake', sub: userId };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
    return refreshToken;
  }
}
