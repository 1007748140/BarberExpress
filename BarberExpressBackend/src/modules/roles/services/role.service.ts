// src/modules/roles/services/role.service.ts
import { AppDataSource } from '../../../config/database';
import { Role } from '../entities/role.entity';

export class RoleService {
    private roleRepository = AppDataSource.getRepository(Role);

    async getRoles() {
        return this.roleRepository.find();
    }
}