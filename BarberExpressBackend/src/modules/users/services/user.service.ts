// src/modules/users/services/user.service.ts
import { AppDataSource } from '../../../config/database';
import { People } from '../entities/people.entity';
import { PeopleInfo } from '../entities/people-info.entity';
import { PeopleLocation } from '../entities/people-location.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import bcrypt from 'bcrypt';

export class UserService {
    private peopleRepository = AppDataSource.getRepository(People);
    private peopleInfoRepository = AppDataSource.getRepository(PeopleInfo);
    private peopleLocationRepository = AppDataSource.getRepository(PeopleLocation);

    async createUser(userData: CreateUserDto) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Check if email already exists
            const existingUser = await this.peopleInfoRepository.findOne({
                where: { email: userData.email }
            });

            if (existingUser) {
                throw new Error('Email already exists');
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(userData.password, 10);

            // Create people
            const people = this.peopleRepository.create({
                first_name: userData.first_name,
                last_name: userData.last_name,
            });
            await queryRunner.manager.save(people);

            // Create people_location
            // Create people_location
const location = this.peopleLocationRepository.create({
    people: people,  // Aquí se referencia a la relación people en lugar de usar people_id
    country_id: userData.country_id,
    state_id: userData.state_id,
    latitude: userData.latitude,
    longitude: userData.longitude,
});

            await queryRunner.manager.save(location);

// Create people_info
const info = this.peopleInfoRepository.create({
    people: people,  // Relación con People en lugar de people_id
    email: userData.email,
    password: hashedPassword,
    phone: userData.phone,
    role_id: userData.role_id,
    location_id: location.id,
});

            await queryRunner.manager.save(info);

            await queryRunner.commitTransaction();

            return { id: people.id, email: info.email };
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}