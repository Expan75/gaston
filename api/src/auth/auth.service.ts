import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PasswordStrippedUser } from '../users/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async authenticate(email: string, clearTextPassword: string): Promise<PasswordStrippedUser | null> {
        const user = await this.usersService.findOneByEmail(email)
        if (user) {
            const password = await bcrypt.hash(clearTextPassword, 10)
            const passwordMatches = await bcrypt.compare(password, user.password)
            if (passwordMatches) {
                const { password, ...passwordStrippedUser } = user;
                return passwordStrippedUser;
            }
        }
        return null;
    }

    async login(user: PasswordStrippedUser) {
        const payload = { email: user.email, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}