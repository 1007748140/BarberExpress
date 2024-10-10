// src/modules/users/services/user.service.ts
import { AppDataSource } from '../../../config/database';
import { People } from '../entities/people.entity';
import { PeopleInfo } from '../entities/people-info.entity';
import { PeopleLocation } from '../entities/people-location.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import bcrypt from 'bcrypt';

// Definir constantes
const SALT_ROUNDS = 10;
const DEFAULT_ROLE_ID = 1;

export class UserService {
    private peopleRepository = AppDataSource.getRepository(People);
    private peopleInfoRepository = AppDataSource.getRepository(PeopleInfo);
    private peopleLocationRepository = AppDataSource.getRepository(PeopleLocation);

    async create(createUserDto: CreateUserDto) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Verificar si el email ya existe
            const existingUser = await this.peopleInfoRepository.findOne({
                where: { email: createUserDto.email }
            });

            if (existingUser) {
                throw new Error('Este Email ya esta registrado');
            }

            // Hashear la contraseña antes de guardarla
            const hashedPassword = await bcrypt.hash(createUserDto.password, SALT_ROUNDS);

            // Crear persona
            const people = this.peopleRepository.create({
                first_name: createUserDto.first_name,
                last_name: createUserDto.last_name,
            });
            await queryRunner.manager.save(people);

            // Crear ubicación
            const location = this.peopleLocationRepository.create({
                people,
                country_id: createUserDto.country_id,
                state_id: createUserDto.state_id,
                latitude: createUserDto.latitude,
                longitude: createUserDto.longitude,
            });
            await queryRunner.manager.save(location);

            // Crear info del usuario con la contraseña hasheada
            const info = this.peopleInfoRepository.create({
                people,
                email: createUserDto.email,
                password: hashedPassword, // Usar la contraseña hasheada
                phone: createUserDto.phone,
                role_id: DEFAULT_ROLE_ID, // Usar constante para el rol
                location_id: location.id,
            });
            await queryRunner.manager.save(info);

            // Confirmar la transacción
            await queryRunner.commitTransaction();

            return this.findOne(people.id);
        } catch (error: any) {
            await queryRunner.rollbackTransaction();

            if (error.message === 'Este Email ya esta registrado') {
                throw new Error('Intenta acceder a tu cuenta, ya estas registrado.');
            }

            throw new Error(`Error creating user: ${error.message}`);
        } finally {
            await queryRunner.release();
        }
    }

    async findOne(id: number) {
        return this.peopleRepository.findOne({
            where: { id },
            relations: ['info', 'location'],
        });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            const user = await this.findOne(id);
            if (!user) {
                throw new Error('User not found');
            }

            // Actualizar datos básicos
            if (updateUserDto.first_name) user.first_name = updateUserDto.first_name;
            if (updateUserDto.last_name) user.last_name = updateUserDto.last_name;
            await queryRunner.manager.save(user);

            // Actualizar ubicación
            if (updateUserDto.country_id || updateUserDto.state_id || 
                updateUserDto.latitude || updateUserDto.longitude) {
                const location = user.location;
                if (updateUserDto.country_id) location.country_id = updateUserDto.country_id;
                if (updateUserDto.state_id) location.state_id = updateUserDto.state_id;
                if (updateUserDto.latitude) location.latitude = updateUserDto.latitude;
                if (updateUserDto.longitude) location.longitude = updateUserDto.longitude;
                await queryRunner.manager.save(location);
            }

            // Actualizar info
            if (updateUserDto.phone || updateUserDto.profile_image) {
                const info = user.info;
                if (updateUserDto.phone) info.phone = updateUserDto.phone;
                if (updateUserDto.profile_image) info.profile_image = updateUserDto.profile_image;
                await queryRunner.manager.save(info);
            }

            await queryRunner.commitTransaction();

            return this.findOne(id);
        } catch (error: any) {
            await queryRunner.rollbackTransaction();
            throw new Error(`Error updating user: ${error.message}`);
        } finally {
            await queryRunner.release();
        }
    }
}
