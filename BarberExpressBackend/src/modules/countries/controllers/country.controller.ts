// src/modules/countries/controllers/country.controller.ts
import { Request, Response } from 'express';
import { CountryService } from '../services/country.service';

export class CountryController {
    private countryService: CountryService;

    constructor() {
        this.countryService = new CountryService();
    }

    getCountries = async (_req: Request, res: Response): Promise<void> => {
        try {
            const countries = await this.countryService.getCountries();
            res.json(countries);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}