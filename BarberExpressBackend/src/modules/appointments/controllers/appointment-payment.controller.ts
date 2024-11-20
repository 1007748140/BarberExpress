// src/modules/appointments/controllers/appointment-payment.controller.ts
import { Response } from 'express';
import { AppointmentPaymentService } from '../services/appointment-payment.service';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthenticatedRequest } from '../../../middlewares/auth.middleware';

export class AppointmentPaymentController {
    private appointmentPaymentService: AppointmentPaymentService;

    constructor() {
        this.appointmentPaymentService = new AppointmentPaymentService();
    }

    createPayment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            if (!req.user?.id) {
                res.status(401).json({ message: 'Usuario no autenticado' });
                return;
            }

            const createPaymentDto = plainToClass(CreatePaymentDto, req.body);
            const errors = await validate(createPaymentDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.appointmentPaymentService.createPayment(
                req.user.id,
                createPaymentDto
            );
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al procesar el pago',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getPaymentDetails = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { paymentId } = req.params;
            const result = await this.appointmentPaymentService.getPaymentDetails(Number(paymentId));
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los detalles del pago',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getUserPayments = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            if (!req.user?.id) {
                res.status(401).json({ message: 'Usuario no autenticado' });
                return;
            }

            const result = await this.appointmentPaymentService.getUserPayments(req.user.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los pagos del usuario',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}