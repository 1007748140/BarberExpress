// src/modules/user-info/controllers/user-location.controller.ts
import { Response } from 'express';
import { UserLocationService } from '../services/user-location.service';
import { CreateUserLocationDto } from '../dtos/create-user-location.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthenticatedRequest } from '../../../middlewares/auth.middleware';

export class UserLocationController {
    private userLocationService: UserLocationService;

    constructor() {
        this.userLocationService = new UserLocationService();
    }

    create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            if (!req.user?.id) {
                res.status(401).json({ message: 'Usuario no autenticado' });
                return;
            }

            const createLocationDto = plainToClass(CreateUserLocationDto, req.body);
            const errors = await validate(createLocationDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.userLocationService.create(
                req.user.id,
                createLocationDto
            );
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al crear la ubicación',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getUserLocation = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            if (!req.user?.id) {
                res.status(401).json({ message: 'Usuario no autenticado' });
                return;
            }

            const result = await this.userLocationService.getUserLocation(req.user.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener la ubicación',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getCountries = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const result = await this.userLocationService.getCountries();
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los países',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getDepartments = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { countryId } = req.params;
            const result = await this.userLocationService.getDepartments(Number(countryId));
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los departamentos',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}