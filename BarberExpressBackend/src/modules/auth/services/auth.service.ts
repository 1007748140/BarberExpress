// src/modules/auth/services/auth.service.ts
import bcrypt from 'bcrypt';
import { AppDataSource } from '../../../config/database';
import { User } from '../entities/user.entity';
import { generateToken } from '../../../config/jwt.config';

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: { email },
            relations: ['role']
        });

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = generateToken(user.id, user.email, user.role.name);

        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.first_name,
                lastName: user.last_name,
                role: user.role.name
            }
        };
    }
}