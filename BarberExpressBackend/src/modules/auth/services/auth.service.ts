// src/modules/auth/services/auth.service.ts
import bcrypt from 'bcrypt';
import { AppDataSource } from '../../../config/database';
import { PeopleInfo } from '../../users/entities/people-info.entity';
import { generateToken } from '../../../config/jwt.config';

export class AuthService {
    private peopleInfoRepository = AppDataSource.getRepository(PeopleInfo);

    async login(email: string, password: string) {
        const userInfo = await this.peopleInfoRepository.findOne({
            where: { email },
            relations: ['people']
        });

        if (!userInfo) {
            throw new Error('User not found');
        }

        const isPasswordValid = await bcrypt.compare(password, userInfo.password);

        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = generateToken(userInfo.people.id, userInfo.email);

        return {
            token,
            user: {
                id: userInfo.people.id,
                email: userInfo.email,
                firstName: userInfo.people.first_name,
                lastName: userInfo.people.last_name
            }
        };
    }
}
