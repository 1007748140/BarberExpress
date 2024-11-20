// src/modules/appointments/entities/appointment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Barbershop } from '../../barbershops/entities/barbershop.entity';
import { BarbershopBarber } from '../../barbershops/entities/barbershop-barber.entity';
import { BarbershopService } from '../../barbershops/entities/barbershop-service.entity';

@Entity('appointments')
export class Appointment {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user!: User;

    @ManyToOne(() => Barbershop)
    @JoinColumn({ name: 'id_barbershop' })
    barbershop!: Barbershop;

    @ManyToOne(() => BarbershopBarber)
    @JoinColumn({ name: 'id_barber' })
    barber!: BarbershopBarber;

    @ManyToOne(() => BarbershopService)
    @JoinColumn({ name: 'id_service' })
    service!: BarbershopService;

    @Column({ name: 'appointment_date', type: 'date' })
    appointmentDate!: Date;

    @Column({ name: 'start_time', type: 'time' })
    startTime!: string;

    @Column({ name: 'end_time', type: 'time' })
    endTime!: string;

    @Column()
    status!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}