import { AppointmentController } from '../controllers/appointment.controller';
import { AppointmentService } from '../services/appointment.service';
import { Response } from 'express';
import { AuthenticatedRequest } from '../../../middlewares/auth.middleware';
import { CreateAppointmentDto } from '../dtos/create-appointment.dto';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { User } from '../../auth/entities/user.entity';
import { Barbershop } from '../../barbershops/entities/barbershop.entity';
import { BarbershopBarber } from '../../barbershops/entities/barbershop-barber.entity';
import { BarbershopService } from '../../barbershops/entities/barbershop-service.entity';

jest.mock('../services/appointment.service');
jest.mock('class-validator');
jest.mock('class-transformer');

describe('AppointmentController', () => {
    let appointmentController: AppointmentController;
    let mockAppointmentService: jest.Mocked<AppointmentService>;
    let mockRequest: Partial<AuthenticatedRequest>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockAppointmentService = new AppointmentService() as jest.Mocked<AppointmentService>;
        appointmentController = new AppointmentController();
        mockRequest = {
            user: { 
                id: 1,
                email: 'test@example.com',
                roles: ['Cliente']
            },
            body: {}
        };
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('create', () => {
        it('should create an appointment successfully', async () => {
            const dto = new CreateAppointmentDto();
            (plainToClass as jest.Mock).mockReturnValue(dto);
            (validate as jest.Mock).mockResolvedValue([]);
            mockAppointmentService.create.mockResolvedValue({
                id: 1,
                user: new User(),
                barbershop: new Barbershop(),
                barber: new BarbershopBarber(),
                service: new BarbershopService(),
                appointmentDate: new Date(),
                startTime: '10:00',
                endTime: '11:00',
                status: 'confirmed',
                createdAt: new Date(),
                updatedAt: new Date()
            });

            await appointmentController.create(mockRequest as AuthenticatedRequest, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith({
                id: 1,
                user: expect.any(User),
                barbershop: expect.any(Barbershop),
                barber: expect.any(BarbershopBarber),
                service: expect.any(BarbershopService),
                appointmentDate: expect.any(Date),
                startTime: '10:00',
                endTime: '11:00',
                status: 'confirmed',
                createdAt: expect.any(Date),
                updatedAt: expect.any(Date)
            });
        });

        it('should return 400 if validation fails', async () => {
            const dto = new CreateAppointmentDto();
            (plainToClass as jest.Mock).mockReturnValue(dto);
            (validate as jest.Mock).mockResolvedValue([{ property: 'error' }]);

            await appointmentController.create(mockRequest as AuthenticatedRequest, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(mockResponse.json).toHaveBeenCalledWith({ errors: [{ property: 'error' }] });
        });

        it('should return 401 if user is not authenticated', async () => {
            mockRequest.user = undefined;

            await appointmentController.create(mockRequest as AuthenticatedRequest, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(401);
            expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Usuario no autenticado' });
        });

        it('should return 500 if there is an error', async () => {
            const dto = new CreateAppointmentDto();
            (plainToClass as jest.Mock).mockReturnValue(dto);
            (validate as jest.Mock).mockResolvedValue([]);
            mockAppointmentService.create.mockRejectedValue(new Error('Error'));

            await appointmentController.create(mockRequest as AuthenticatedRequest, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error al crear la cita',
                error: 'Error'
            });
        });
    });
});