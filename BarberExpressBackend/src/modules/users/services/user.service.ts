// src/modules/users/services/user.service.ts
import { AppDataSource } from '../../../config/database';
import { User } from '../entities/user.entity';
import { UserLocation } from '../entities/user-location.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import bcrypt from 'bcrypt';

export class UserService {
    private userRepository = AppDataSource.getRepository(User);
    private userLocationRepository = AppDataSource.getRepository(UserLocation);

    async createUser(userData: CreateUserDto) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Check if email already exists
            const existingUser = await this.userRepository.findOne({
                where: { email: userData.email }
            });

            if (existingUser) {
                throw new Error('Email already exists');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            // Create user
            const user = this.userRepository.create({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: hashedPassword,
                phone: userData.phone,
                role: { id: userData.idRole }
            });
            await queryRunner.manager.save(user);

            // Create user_location
            const location = this.userLocationRepository.create({
                user: user,
                country: { id: userData.idCountry },
                department: { id: userData.idDepartment },
                latitude: userData.latitude,
                longitude: userData.longitude,
            });
            await queryRunner.manager.save(location);

            await queryRunner.commitTransaction();

            return { id: user.id, email: user.email };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}