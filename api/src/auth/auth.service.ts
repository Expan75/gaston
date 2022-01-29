import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordStrippedUser } from '../users/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtToken } from './auth.types';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async authenticate(email: string, clearTextPassword: string): Promise<PasswordStrippedUser | null> {
        const user = await this.usersService.findOneByEmail(email)
        console.log('found user in auth service: ', user)
        if (user) {
            const password = await bcrypt.hash(clearTextPassword, 10)
            const passwordMatches = await bcrypt.compare(password, user.password)
            console.log("passwordMatches: ", passwordMatches)
            if (passwordMatches) {
                const { password, ...passwordStrippedUser } = user;
                return passwordStrippedUser;
            }
        }
        return null;
    }

    async login(user: PasswordStrippedUser): Promise<JwtToken> {
        const payload = { email: user.email, sub: user.id }
        const token: JwtToken = { access_token: this.jwtService.sign(payload) }
        return token
    }

    async refresh(token: { access_token: string }): Promise<JwtToken> {
        const validatedJwt = await this.jwtService.verifyAsync(token.access_token);
        const { password, ...passwordStrippedUser } = await this.usersService.findOneByEmail(validatedJwt.email);
        if (passwordStrippedUser) {
            return await this.login(passwordStrippedUser)
        } else {
            throw new Error('could not refresh token')
        }
    }
}