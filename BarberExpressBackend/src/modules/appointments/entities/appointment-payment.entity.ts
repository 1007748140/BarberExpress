// src/modules/appointments/entities/appointment-payment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Barbershop } from '../../barbershops/entities/barbershop.entity';
import { BarbershopBarber } from '../../barbershops/entities/barbershop-barber.entity';
import { Appointment } from './appointment.entity';
import { PaymentGateway } from './payment-gateway.entity';
import { PaymentStatus } from './payment-status.entity';
import { CommissionValueAppointment } from './commission-value-appointment.entity';

@Entity('appointment_payments')
export class AppointmentPayment {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user!: User;

    @ManyToOne(() => Barbershop)
    @JoinColumn({ name: 'id_barbershop' })
    barbershop!: Barbershop;

    @ManyToOne(() => BarbershopBarber)
    @JoinColumn({ name: 'id_barbershop_barber' })
    barber!: BarbershopBarber;

    @ManyToOne(() => Appointment)
    @JoinColumn({ name: 'id_appointment' })
    appointment!: Appointment;

    @ManyToOne(() => PaymentGateway)
    @JoinColumn({ name: 'id_payment_gateways' })
    paymentGateway!: PaymentGateway;

    @ManyToOne(() => PaymentStatus)
    @JoinColumn({ name: 'id_payment_status' })
    paymentStatus!: PaymentStatus;

    @Column('decimal', { precision: 10, scale: 2 })
    total!: number;

    @Column('decimal', { precision: 10, scale: 2, name: 'total_receive_barbershop' })
    totalReceiveBarbershop!: number;

    @ManyToOne(() => CommissionValueAppointment)
    @JoinColumn({ name: 'id_commission_appointment' })
    commission!: CommissionValueAppointment;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}