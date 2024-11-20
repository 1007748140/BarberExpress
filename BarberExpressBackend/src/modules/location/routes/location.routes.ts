// src/modules/location/routes/location.routes.ts
import { Router } from 'express';
import { LocationController } from '../controllers/location.controller';

const router = Router();
const locationController = new LocationController();

router.get('/data', locationController.getLocationData);

export default router;