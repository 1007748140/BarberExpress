// src/modules/appointments/controllers/appointment.controller.ts
import { Request, Response } from 'express';
import { AppointmentService } from '../services/appointment.service';
import { CreateAppointmentDto } from '../dtos/create-appointment.dto';
import { UpdateAppointmentDto } from '../dtos/update-appointment.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthenticatedRequest } from '../../../middlewares/auth.middleware';

export class AppointmentController {
    private appointmentService: AppointmentService;

    constructor() {
        this.appointmentService = new AppointmentService();
    }

    create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            if (!req.user?.id) {
                res.status(401).json({ message: 'Usuario no autenticado' });
                return;
            }

            const createAppointmentDto = plainToClass(CreateAppointmentDto, req.body);
            const errors = await validate(createAppointmentDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.appointmentService.create(
                req.user.id,
                createAppointmentDto
            );
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al crear la cita',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    update = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const updateAppointmentDto = plainToClass(UpdateAppointmentDto, req.body);
            const errors = await validate(updateAppointmentDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.appointmentService.update(
                Number(id),
                updateAppointmentDto
            );
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar la cita',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const result = await this.appointmentService.getById(Number(id));
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener la cita',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getUserAppointments = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            if (!req.user?.id) {
                res.status(401).json({ message: 'Usuario no autenticado' });
                return;
            }

            const result = await this.appointmentService.getUserAppointments(req.user.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener las citas del usuario',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getBarberAppointments = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { barberId } = req.params;
            const result = await this.appointmentService.getBarberAppointments(Number(barberId));
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener las citas del barbero',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}