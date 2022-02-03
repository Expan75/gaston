import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordStrippedUser } from '../users/user.entity';
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
        // eslint-disable-next-line
        const { password, ...passwordStrippedUser } = user;
        return passwordStrippedUser;
      }
    }
    return null;
  }

  async validateAccessToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async getAccessToken(user: any): Promise<string> {
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
    });
    return accessToken;
  }

  async validateRefreshToken(token: string): Promise<any> {
    return await this.jwtService.verifyAsync(token, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    });
  }

  async getRefreshToken(user: any): Promise<string> {
    const payload = { email: user.email, sub: user._id };
    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
    });
    return refreshToken;
  }
}
