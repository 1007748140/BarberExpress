import { AppointmentService } from '../services/appointment.service';
import { AppDataSource } from '../../../config/database';
import { Appointment } from '../entities/appointment.entity';
import { User } from '../../auth/entities/user.entity';
import { Barbershop } from '../../barbershops/entities/barbershop.entity';
import { BarbershopBarber } from '../../barbershops/entities/barbershop-barber.entity';
import { BarbershopService } from '../../barbershops/entities/barbershop-service.entity';
import { CreateAppointmentDto } from '../dtos/create-appointment.dto';
import { Repository } from 'typeorm';

jest.mock('../../../config/database');

describe('AppointmentService', () => {
    let appointmentService: AppointmentService;
    let mockAppointmentRepository: jest.Mocked<Repository<Appointment>>;
    let mockUserRepository: jest.Mocked<Repository<User>>;
    let mockBarberRepository: jest.Mocked<Repository<BarbershopBarber>>;
    let mockServiceRepository: jest.Mocked<Repository<BarbershopService>>;

    beforeEach(() => {
        mockAppointmentRepository = {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn()
        } as unknown as jest.Mocked<Repository<Appointment>>;

        mockUserRepository = {
            findOne: jest.fn()
        } as unknown as jest.Mocked<Repository<User>>;

        mockBarberRepository = {
            findOne: jest.fn()
        } as unknown as jest.Mocked<Repository<BarbershopBarber>>;

        mockServiceRepository = {
            findOne: jest.fn()
        } as unknown as jest.Mocked<Repository<BarbershopService>>;

        (AppDataSource.getRepository as jest.Mock).mockImplementation((entity) => {
            if (entity === Appointment) return mockAppointmentRepository;
            if (entity === User) return mockUserRepository;
            if (entity === BarbershopBarber) return mockBarberRepository;
            if (entity === BarbershopService) return mockServiceRepository;
        });

        appointmentService = new AppointmentService();
    });

    describe('create', () => {
        it('should create an appointment successfully', async () => {
            const userId = 1;
            const createAppointmentDto: CreateAppointmentDto = {
                barberId: 1,
                serviceId: 1,
                appointmentDate: new Date(),
                startTime: '10:00',
                endTime: '11:00'
            };

            const user = new User();
            const barber = new BarbershopBarber();
            const service = new BarbershopService();
            barber.barbershop = new Barbershop();

            mockUserRepository.findOne.mockResolvedValue(user);
            mockBarberRepository.findOne.mockResolvedValue(barber);
            mockServiceRepository.findOne.mockResolvedValue(service);
            mockAppointmentRepository.findOne.mockResolvedValue(null);
            mockAppointmentRepository.create.mockReturnValue({
                user,
                barbershop: barber.barbershop,
                barber,
                service,
                appointmentDate: createAppointmentDto.appointmentDate,
                startTime: createAppointmentDto.startTime,
                endTime: createAppointmentDto.endTime,
                status: 'Pendiente'
            } as Appointment);
            mockAppointmentRepository.save.mockResolvedValue({
                id: 1,
                user,
                barbershop: barber.barbershop,
                barber,
                service,
                appointmentDate: createAppointmentDto.appointmentDate,
                startTime: createAppointmentDto.startTime,
                endTime: createAppointmentDto.endTime,
                status: 'Pendiente'
            } as Appointment);

            const result = await appointmentService.create(userId, createAppointmentDto);

            expect(result).toEqual({
                id: 1,
                user,
                barbershop: barber.barbershop,
                barber,
                service,
                appointmentDate: createAppointmentDto.appointmentDate,
                startTime: createAppointmentDto.startTime,
                endTime: createAppointmentDto.endTime,
                status: 'Pendiente'
            });
        });

        it('should throw an error if the user is not found', async () => {
            const userId = 1;
            const createAppointmentDto: CreateAppointmentDto = {
                barberId: 1,
                serviceId: 1,
                appointmentDate: new Date(),
                startTime: '10:00',
                endTime: '11:00'
            };

            mockUserRepository.findOne.mockResolvedValue(null);

            await expect(appointmentService.create(userId, createAppointmentDto)).rejects.toThrow('Usuario no encontrado');
        });

        it('should throw an error if the barber is not found', async () => {
            const userId = 1;
            const createAppointmentDto: CreateAppointmentDto = {
                barberId: 1,
                serviceId: 1,
                appointmentDate: new Date(),
                startTime: '10:00',
                endTime: '11:00'
            };

            const user = new User();

            mockUserRepository.findOne.mockResolvedValue(user);
            mockBarberRepository.findOne.mockResolvedValue(null);

            await expect(appointmentService.create(userId, createAppointmentDto)).rejects.toThrow('Barbero no encontrado');
        });

        it('should throw an error if the service is not found', async () => {
            const userId = 1;
            const createAppointmentDto: CreateAppointmentDto = {
                barberId: 1,
                serviceId: 1,
                appointmentDate: new Date(),
                startTime: '10:00',
                endTime: '11:00'
            };

            const user = new User();
            const barber = new BarbershopBarber();

            mockUserRepository.findOne.mockResolvedValue(user);
            mockBarberRepository.findOne.mockResolvedValue(barber);
            mockServiceRepository.findOne.mockResolvedValue(null);

            await expect(appointmentService.create(userId, createAppointmentDto)).rejects.toThrow('Servicio no encontrado');
        });

        it('should throw an error if the barber is not available', async () => {
            const userId = 1;
            const createAppointmentDto: CreateAppointmentDto = {
                barberId: 1,
                serviceId: 1,
                appointmentDate: new Date(),
                startTime: '10:00',
                endTime: '11:00'
            };

            const user = new User();
            const barber = new BarbershopBarber();
            const service = new BarbershopService();
            const existingAppointment = new Appointment();

            mockUserRepository.findOne.mockResolvedValue(user);
            mockBarberRepository.findOne.mockResolvedValue(barber);
            mockServiceRepository.findOne.mockResolvedValue(service);
            mockAppointmentRepository.findOne.mockResolvedValue(existingAppointment);

            await expect(appointmentService.create(userId, createAppointmentDto)).rejects.toThrow('El barbero no está disponible en ese horario');
        });
    });
});