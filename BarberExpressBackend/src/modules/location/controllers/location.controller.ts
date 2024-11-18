// src/modules/location/controllers/location.controller.ts
import { Request, Response } from 'express';
import { LocationService } from '../services/location.service';

export class LocationController {
    private locationService: LocationService;

    constructor() {
        this.locationService = new LocationService();
    }

    getLocationData = async (_req: Request, res: Response): Promise<void> => {
        try {
            const result = await this.locationService.getLocationData();
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener datos de ubicación',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}