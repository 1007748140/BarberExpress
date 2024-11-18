// src/modules/appointments/services/appointment-payment.service.ts
import { AppDataSource } from '../../../config/database';
import { AppointmentPayment } from '../entities/appointment-payment.entity';
import { PaymentStatus } from '../entities/payment-status.entity';
import { PaymentGateway } from '../entities/payment-gateway.entity';
import { CommissionValueAppointment } from '../entities/commission-value-appointment.entity';
import { Appointment } from '../entities/appointment.entity';
import { CreatePaymentDto } from '../dtos/create-payment.dto';

export class AppointmentPaymentService {
    private paymentRepository = AppDataSource.getRepository(AppointmentPayment);
    private appointmentRepository = AppDataSource.getRepository(Appointment);
    private paymentStatusRepository = AppDataSource.getRepository(PaymentStatus);
    private paymentGatewayRepository = AppDataSource.getRepository(PaymentGateway);
    private commissionRepository = AppDataSource.getRepository(CommissionValueAppointment);

    async createPayment(userId: number, createPaymentDto: CreatePaymentDto): Promise<AppointmentPayment> {
        const appointment = await this.appointmentRepository.findOne({
            where: { id: createPaymentDto.appointmentId },
            relations: ['barbershop', 'barber']
        });

        if (!appointment) {
            throw new Error('Cita no encontrada');
        }

        const paymentGateway = await this.paymentGatewayRepository.findOne({
            where: { id: createPaymentDto.paymentGatewayId }
        });

        if (!paymentGateway) {
            throw new Error('Método de pago no encontrado');
        }

        // Obtener el estado inicial del pago (Pendiente)
        const initialStatus = await this.paymentStatusRepository.findOne({
            where: { status: 'Pendiente' }
        });

        if (!initialStatus) {
            throw new Error('Estado de pago no encontrado');
        }

        // Obtener la comisión actual
        const commission = await this.commissionRepository.findOne({
            where: { id: 1 } // Asumiendo que siempre hay al menos una comisión configurada
        });

        if (!commission) {
            throw new Error('Valor de comisión no encontrado');
        }

        // Calcular el total que recibe la barbería (total - comisión)
        const commissionAmount = (createPaymentDto.total * commission.value) / 100;
        const totalReceiveBarbershop = createPaymentDto.total - commissionAmount;

        const payment = this.paymentRepository.create({
            user: { id: userId },
            barbershop: appointment.barbershop,
            barber: appointment.barber,
            appointment,
            paymentGateway,
            paymentStatus: initialStatus,
            total: createPaymentDto.total,
            totalReceiveBarbershop,
            commission
        });

        return await this.paymentRepository.save(payment);
    }

    async getPaymentDetails(paymentId: number): Promise<AppointmentPayment> {
        const payment = await this.paymentRepository.findOne({
            where: { id: paymentId },
            relations: ['user', 'barbershop', 'barber', 'appointment', 'paymentGateway', 'paymentStatus']
        });

        if (!payment) {
            throw new Error('Pago no encontrado');
        }

        return payment;
    }

    async getUserPayments(userId: number): Promise<AppointmentPayment[]> {
        return await this.paymentRepository.find({
            where: { user: { id: userId } },
            relations: ['barbershop', 'appointment', 'paymentStatus'],
            order: { createdAt: 'DESC' }
        });
    }
}