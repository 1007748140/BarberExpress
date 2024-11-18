"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const appointment_controller_1 = require("../controllers/appointment.controller");
const appointment_payment_controller_1 = require("../controllers/appointment-payment.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const appointmentController = new appointment_controller_1.AppointmentController();
const appointmentPaymentController = new appointment_payment_controller_1.AppointmentPaymentController();
router.post('/', (0, auth_middleware_1.authMiddleware)(['Cliente']), appointmentController.create);
router.put('/:id', (0, auth_middleware_1.authMiddleware)(['Cliente', 'Barbero', 'AdminBarberia']), appointmentController.update);
router.get('/user', (0, auth_middleware_1.authMiddleware)(['Cliente']), appointmentController.getUserAppointments);
router.get('/barber/:barberId', (0, auth_middleware_1.authMiddleware)(['Barbero', 'AdminBarberia']), appointmentController.getBarberAppointments);
router.get('/:id', (0, auth_middleware_1.authMiddleware)(['Cliente', 'Barbero', 'AdminBarberia']), appointmentController.getById);
router.post('/payments', (0, auth_middleware_1.authMiddleware)(['Cliente']), appointmentPaymentController.createPayment);
router.get('/payments/:paymentId', (0, auth_middleware_1.authMiddleware)(['Cliente', 'Barbero', 'AdminBarberia']), appointmentPaymentController.getPaymentDetails);
router.get('/payments/user', (0, auth_middleware_1.authMiddleware)(['Cliente']), appointmentPaymentController.getUserPayments);
exports.default = router;
//# sourceMappingURL=appointment.routes.js.map