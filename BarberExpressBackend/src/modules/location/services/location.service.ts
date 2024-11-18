// src/modules/location/services/location.service.ts
import { AppDataSource } from '../../../config/database';
import { Country } from '../entities/country.entity';
import { Department } from '../entities/department.entity';

export class LocationService {
    private countryRepository = AppDataSource.getRepository(Country);
    private departmentRepository = AppDataSource.getRepository(Department);

    async getLocationData() {
        const [countries, departments] = await Promise.all([
            this.countryRepository.find(),
            this.departmentRepository.find()
        ]);

        return {
            countries,
            departments
        };
    }
}