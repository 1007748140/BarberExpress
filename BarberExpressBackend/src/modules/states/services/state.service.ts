// src/modules/states/services/state.service.ts
import { AppDataSource } from '../../../config/database';
import { Department } from '../entities/state.entity';

export class DepartmentService {
    private departmentRepository = AppDataSource.getRepository(Department);

    async getDepartmentsByCountry(countryId: number) {
        return this.departmentRepository.find({
            where: { country: { id: countryId } },
            relations: ['country'],
        });
    }
}