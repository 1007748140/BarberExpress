// src/modules/barbershops/services/barbershop-service.service.ts
import { AppDataSource } from '../../../config/database';
import { BarbershopService as BarbershopServiceEntity } from '../entities/barbershop-service.entity';
import { Barbershop } from '../entities/barbershop.entity';
import { BankService } from '../entities/bank-service.entity';
import { ServiceDuration } from '../entities/service-duration.entity';
import { CreateBarbershopServiceDto } from '../dtos/create-service.dto';

export class BarbershopServiceService {
    private barbershopServiceRepository = AppDataSource.getRepository(BarbershopServiceEntity);
    private barbershopRepository = AppDataSource.getRepository(Barbershop);
    private bankServiceRepository = AppDataSource.getRepository(BankService);
    private durationRepository = AppDataSource.getRepository(ServiceDuration);

    async addService(
        barbershopId: number,
        createServiceDto: CreateBarbershopServiceDto
    ): Promise<BarbershopServiceEntity> {
        const barbershop = await this.barbershopRepository.findOne({
            where: { id: barbershopId }
        });

        if (!barbershop) {
            throw new Error('Barbería no encontrada');
        }

        const service = await this.bankServiceRepository.findOne({
            where: { id: createServiceDto.serviceId }
        });

        if (!service) {
            throw new Error('Servicio no encontrado');
        }

        const duration = await this.durationRepository.findOne({
            where: { id: createServiceDto.durationId }
        });

        if (!duration) {
            throw new Error('Duración no encontrada');
        }

        const barbershopService = this.barbershopServiceRepository.create({
            barbershop,
            service,
            duration
        });

        return await this.barbershopServiceRepository.save(barbershopService);
    }

    async getServices(barbershopId: number): Promise<BarbershopServiceEntity[]> {
        return await this.barbershopServiceRepository.find({
            where: { barbershop: { id: barbershopId } },
            relations: ['service', 'duration']
        });
    }

    async removeService(barbershopId: number, serviceId: number): Promise<void> {
        const result = await this.barbershopServiceRepository.delete({
            barbershop: { id: barbershopId },
            service: { id: serviceId }
        });

        if (result.affected === 0) {
            throw new Error('Servicio no encontrado en la barbería');
        }
    }
}