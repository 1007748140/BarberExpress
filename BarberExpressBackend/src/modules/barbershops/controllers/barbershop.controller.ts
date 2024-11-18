// src/modules/barbershops/controllers/barbershop.controller.ts
import { Request, Response } from 'express';
import { BarbershopService } from '../services/barbershop.service';
import { CreateBarbershopDto } from '../dtos/create-barbershop.dto';
import { UpdateBarbershopDto } from '../dtos/update-barbershop.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthenticatedRequest } from '../../../middlewares/auth.middleware';

export class BarbershopController {
    private barbershopService: BarbershopService;

    constructor() {
        this.barbershopService = new BarbershopService();
    }

    create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const createBarbershopDto = plainToClass(CreateBarbershopDto, req.body);
            const errors = await validate(createBarbershopDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.barbershopService.create(createBarbershopDto);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al crear la barbería',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    update = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const updateBarbershopDto = plainToClass(UpdateBarbershopDto, req.body);
            const errors = await validate(updateBarbershopDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.barbershopService.update(Number(id), updateBarbershopDto);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar la barbería',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const result = await this.barbershopService.getById(Number(id));
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener la barbería',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getAll = async (_req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.barbershopService.getAll();
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener las barberías',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await this.barbershopService.delete(Number(id));
            res.json({ message: 'Barbería eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar la barbería',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}