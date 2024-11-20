// src/modules/user-info/services/user-location.service.ts
import { AppDataSource } from '../../../config/database';
import { UserLocation } from '../entities/user-location.entity';
import { Country } from '../entities/country.entity';
import { Department } from '../entities/department.entity';
import { User } from '../../auth/entities/user.entity';
import { CreateUserLocationDto } from '../dtos/create-user-location.dto';

export class UserLocationService {
    private locationRepository = AppDataSource.getRepository(UserLocation);
    private countryRepository = AppDataSource.getRepository(Country);
    private departmentRepository = AppDataSource.getRepository(Department);
    private userRepository = AppDataSource.getRepository(User);

    async create(userId: number, createLocationDto: CreateUserLocationDto): Promise<UserLocation> {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const country = await this.countryRepository.findOne({
            where: { id: createLocationDto.countryId }
        });

        if (!country) {
            throw new Error('País no encontrado');
        }

        const department = await this.departmentRepository.findOne({
            where: { id: createLocationDto.departmentId }
        });

        if (!department) {
            throw new Error('Departamento no encontrado');
        }

        // Verificar si el usuario ya tiene una ubicación registrada
        const existingLocation = await this.locationRepository.findOne({
            where: { user: { id: userId } }
        });

        if (existingLocation) {
            // Actualizar la ubicación existente
            existingLocation.country = country;
            existingLocation.department = department;
            existingLocation.latitude = createLocationDto.latitude;
            existingLocation.longitude = createLocationDto.longitude;
            return await this.locationRepository.save(existingLocation);
        }

        // Crear nueva ubicación
        const location = this.locationRepository.create({
            user,
            country,
            department,
            latitude: createLocationDto.latitude,
            longitude: createLocationDto.longitude
        });

        return await this.locationRepository.save(location);
    }

    async getUserLocation(userId: number): Promise<UserLocation> {
        const location = await this.locationRepository.findOne({
            where: { user: { id: userId } },
            relations: ['country', 'department']
        });

        if (!location) {
            throw new Error('Ubicación no encontrada');
        }

        return location;
    }

    async getCountries(): Promise<Country[]> {
        return await this.countryRepository.find({
            order: { name: 'ASC' }
        });
    }

    async getDepartments(countryId: number): Promise<Department[]> {
        return await this.departmentRepository.find({
            where: { country: { id: countryId } },
            order: { name: 'ASC' }
        });
    }
}