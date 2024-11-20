// src/modules/barbershops/routes/barbershop.routes.ts
import { Router } from 'express';
import { BarbershopController } from '../controllers/barbershop.controller';
import { BarbershopServiceController } from '../controllers/barbershop-service.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const router = Router();
const barbershopController = new BarbershopController();
const barbershopServiceController = new BarbershopServiceController();

// Rutas para barberías
router.post(
    '/',
    authMiddleware(['AdminBarberia']),
    barbershopController.create
);

router.put(
    '/:id',
    authMiddleware(['AdminBarberia']),
    barbershopController.update
);

router.get('/:id', barbershopController.getById);
router.get('/', barbershopController.getAll);

router.delete(
    '/:id',
    authMiddleware(['AdminBarberia']),
    barbershopController.delete
);

// Rutas para servicios de barbería
router.post(
    '/:barbershopId/services',
    authMiddleware(['AdminBarberia']),
    barbershopServiceController.addService
);

router.get(
    '/:barbershopId/services',
    barbershopServiceController.getServices
);

router.delete(
    '/:barbershopId/services/:serviceId',
    authMiddleware(['AdminBarberia']),
    barbershopServiceController.removeService
);

export default router;