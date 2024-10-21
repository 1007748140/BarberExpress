// src/modules/states/controllers/state.controller.ts
import { Request, Response } from 'express';
import { DepartmentService } from '../services/state.service';

export class DepartmentController {
    private departmentService: DepartmentService;

    constructor() {
        this.departmentService = new DepartmentService();
    }

    getDepartmentsByCountry = async (req: Request, res: Response): Promise<void> => {
        try {
            const countryId = parseInt(req.query.countryId as string);
            if (isNaN(countryId)) {
                res.status(400).json({ message: 'Invalid country ID' });
                return;
            }
            const departments = await this.departmentService.getDepartmentsByCountry(countryId);
            res.json(departments);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}