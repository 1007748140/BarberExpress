// src/modules/appointments/services/appointment.service.ts
import { AppDataSource } from '../../../config/database';
import { Appointment } from '../entities/appointment.entity';
import { User } from '../../auth/entities/user.entity';
import { BarbershopBarber } from '../../barbershops/entities/barbershop-barber.entity';
import { BarbershopService } from '../../barbershops/entities/barbershop-service.entity';
import { CreateAppointmentDto } from '../dtos/create-appointment.dto';
import { UpdateAppointmentDto } from '../dtos/update-appointment.dto';
import { Between } from 'typeorm';

export class AppointmentService {
    private appointmentRepository = AppDataSource.getRepository(Appointment);
    private userRepository = AppDataSource.getRepository(User);
    private barberRepository = AppDataSource.getRepository(BarbershopBarber);
    private serviceRepository = AppDataSource.getRepository(BarbershopService);

    async create(userId: number, createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const barber = await this.barberRepository.findOne({
            where: { id: createAppointmentDto.barberId },
            relations: ['barbershop']
        });

        if (!barber) {
            throw new Error('Barbero no encontrado');
        }

        const service = await this.serviceRepository.findOne({
            where: { id: createAppointmentDto.serviceId }
        });

        if (!service) {
            throw new Error('Servicio no encontrado');
        }

        // Verificar disponibilidad del barbero
        const existingAppointment = await this.appointmentRepository.findOne({
            where: {
                barber: { id: createAppointmentDto.barberId },
                appointmentDate: createAppointmentDto.appointmentDate,
                startTime: Between(createAppointmentDto.startTime, createAppointmentDto.endTime)
            }
        });

        if (existingAppointment) {
            throw new Error('El barbero no está disponible en ese horario');
        }

        const appointment = this.appointmentRepository.create({
            user,
            barbershop: barber.barbershop,
            barber,
            service,
            appointmentDate: createAppointmentDto.appointmentDate,
            startTime: createAppointmentDto.startTime,
            endTime: createAppointmentDto.endTime,
            status: 'Pendiente'
        });

        return await this.appointmentRepository.save(appointment);
    }

    async update(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
        const appointment = await this.appointmentRepository.findOne({
            where: { id }
        });

        if (!appointment) {
            throw new Error('Cita no encontrada');
        }

        Object.assign(appointment, updateAppointmentDto);
        return await this.appointmentRepository.save(appointment);
    }

    async getById(id: number): Promise<Appointment> {
        const appointment = await this.appointmentRepository.findOne({
            where: { id },
            relations: ['user', 'barbershop', 'barber', 'service']
        });

        if (!appointment) {
            throw new Error('Cita no encontrada');
        }

        return appointment;
    }

    async getUserAppointments(userId: number): Promise<Appointment[]> {
        return await this.appointmentRepository.find({
            where: { user: { id: userId } },
            relations: ['barbershop', 'barber', 'service'],
            order: { appointmentDate: 'DESC' }
        });
    }

    async getBarberAppointments(barberId: number): Promise<Appointment[]> {
        return await this.appointmentRepository.find({
            where: { barber: { id: barberId } },
            relations: ['user', 'barbershop', 'service'],
            order: { appointmentDate: 'DESC' }
        });
    }
}