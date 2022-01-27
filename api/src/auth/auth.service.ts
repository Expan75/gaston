import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async login(email: string, clearTextPassword: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email)
        if (user) {
            const password = await bcrypt.hash(clearTextPassword, 10)
            const passwordMatches = await bcrypt.compare(password, user.password)
            if (passwordMatches) {
                const { password, ...result } = user;
                return result;
            }
        }
        return null;
    }
}
