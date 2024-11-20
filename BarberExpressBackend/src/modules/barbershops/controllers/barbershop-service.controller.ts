// src/modules/barbershops/controllers/barbershop-service.controller.ts
import { Request, Response } from 'express';
import { BarbershopServiceService } from '../services/barbershop-service.service';
import { CreateBarbershopServiceDto } from '../dtos/create-service.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class BarbershopServiceController {
    private barbershopServiceService: BarbershopServiceService;

    constructor() {
        this.barbershopServiceService = new BarbershopServiceService();
    }

    addService = async (req: Request, res: Response): Promise<void> => {
        try {
            const { barbershopId } = req.params;
            const createServiceDto = plainToClass(CreateBarbershopServiceDto, req.body);
            const errors = await validate(createServiceDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.barbershopServiceService.addService(
                Number(barbershopId),
                createServiceDto
            );
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al agregar el servicio',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getServices = async (req: Request, res: Response): Promise<void> => {
        try {
            const { barbershopId } = req.params;
            const result = await this.barbershopServiceService.getServices(Number(barbershopId));
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los servicios',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    removeService = async (req: Request, res: Response): Promise<void> => {
        try {
            const { barbershopId, serviceId } = req.params;
            await this.barbershopServiceService.removeService(Number(barbershopId), Number(serviceId));
            res.json({ message: 'Servicio eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar el servicio',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}