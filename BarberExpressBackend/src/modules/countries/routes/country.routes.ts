// src/modules/countries/routes/country.routes.ts
import { Router } from 'express';
import { CountryController } from '../controllers/country.controller';

const router = Router();
const countryController = new CountryController();

router.get('/', countryController.getCountries);

export default router;