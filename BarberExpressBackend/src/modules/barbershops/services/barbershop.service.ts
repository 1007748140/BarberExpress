// src/modules/barbershops/services/barbershop.service.ts
import { AppDataSource } from '../../../config/database';
import { Barbershop } from '../entities/barbershop.entity';
import { CreateBarbershopDto } from '../dtos/create-barbershop.dto';
import { UpdateBarbershopDto } from '../dtos/update-barbershop.dto';
import { StateBarbershop } from '../entities/state-barbershop.entity';
import { User } from '../../auth/entities/user.entity';

export class BarbershopService {
    private barbershopRepository = AppDataSource.getRepository(Barbershop);
    private stateRepository = AppDataSource.getRepository(StateBarbershop);
    private userRepository = AppDataSource.getRepository(User);

    async create(createBarbershopDto: CreateBarbershopDto): Promise<Barbershop> {
        const user = await this.userRepository.findOne({
            where: { id: createBarbershopDto.userId }
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Por defecto, el estado inicial será "Cerrado" (ID: 2 según los inserts iniciales)
        const initialState = await this.stateRepository.findOne({
            where: { id: 2 }
        });

        if (!initialState) {
            throw new Error('Estado inicial no encontrado');
        }

        const barbershop = this.barbershopRepository.create({
            user,
            state: initialState,
            name: createBarbershopDto.name,
            description: createBarbershopDto.description,
            imageBanner: createBarbershopDto.imageBanner
        });

        return await this.barbershopRepository.save(barbershop);
    }

    async update(id: number, updateBarbershopDto: UpdateBarbershopDto): Promise<Barbershop> {
        const barbershop = await this.barbershopRepository.findOne({
            where: { id }
        });

        if (!barbershop) {
            throw new Error('Barbería no encontrada');
        }

        if (updateBarbershopDto.stateId) {
            const newState = await this.stateRepository.findOne({
                where: { id: updateBarbershopDto.stateId }
            });
            if (newState) {
                barbershop.state = newState;
            }
        }

        Object.assign(barbershop, updateBarbershopDto);
        return await this.barbershopRepository.save(barbershop);
    }

    async getById(id: number): Promise<Barbershop> {
        const barbershop = await this.barbershopRepository.findOne({
            where: { id },
            relations: ['state', 'services', 'barbers', 'schedules', 'products']
        });

        if (!barbershop) {
            throw new Error('Barbería no encontrada');
        }

        return barbershop;
    }

    async getAll(): Promise<Barbershop[]> {
        return await this.barbershopRepository.find({
            relations: ['state', 'services', 'barbers']
        });
    }

    async delete(id: number): Promise<void> {
        const result = await this.barbershopRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Barbería no encontrada');
        }
    }
}