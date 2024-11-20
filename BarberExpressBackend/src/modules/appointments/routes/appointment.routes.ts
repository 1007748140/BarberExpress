// src/modules/appointments/routes/appointment.routes.ts
import { Router } from 'express';
import { AppointmentController } from '../controllers/appointment.controller';
import { AppointmentPaymentController } from '../controllers/appointment-payment.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const router = Router();
const appointmentController = new AppointmentController();
const appointmentPaymentController = new AppointmentPaymentController();

// Rutas para citas
router.post(
    '/',
    authMiddleware(['Cliente']),
    appointmentController.create
);

router.put(
    '/:id',
    authMiddleware(['Cliente', 'Barbero', 'AdminBarberia']),
    appointmentController.update
);

router.get(
    '/user',
    authMiddleware(['Cliente']),
    appointmentController.getUserAppointments
);

router.get(
    '/barber/:barberId',
    authMiddleware(['Barbero', 'AdminBarberia']),
    appointmentController.getBarberAppointments
);

router.get(
    '/:id',
    authMiddleware(['Cliente', 'Barbero', 'AdminBarberia']),
    appointmentController.getById
);

// Rutas para pagos
router.post(
    '/payments',
    authMiddleware(['Cliente']),
    appointmentPaymentController.createPayment
);

router.get(
    '/payments/:paymentId',
    authMiddleware(['Cliente', 'Barbero', 'AdminBarberia']),
    appointmentPaymentController.getPaymentDetails
);

router.get(
    '/payments/user',
    authMiddleware(['Cliente']),
    appointmentPaymentController.getUserPayments
);

export default router;