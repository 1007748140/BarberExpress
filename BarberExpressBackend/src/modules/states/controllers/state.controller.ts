// src/modules/states/controllers/state.controller.ts
import { Request, Response } from 'express';
import { StateService } from '../services/state.service';

export class StateController {
    private stateService: StateService;

    constructor() {
        this.stateService = new StateService();
    }

    getStatesByCountry = async (req: Request, res: Response): Promise<void> => {
        try {
            const countryId = parseInt(req.query.countryId as string);
            if (isNaN(countryId)) {
                res.status(400).json({ message: 'Invalid country ID' });
                return;
            }
            const states = await this.stateService.getStatesByCountry(countryId);
            res.json(states);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}