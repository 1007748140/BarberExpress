// src/modules/barbershops/entities/barbershop-service.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Barbershop } from './barbershop.entity';
import { BankService } from './bank-service.entity';
import { ServiceDuration } from './service-duration.entity';

@Entity('barbershop_services')
export class BarbershopService {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Barbershop, barbershop => barbershop.services)
    @JoinColumn({ name: 'id_barbershop' })
    barbershop!: Barbershop;

    @ManyToOne(() => BankService)
    @JoinColumn({ name: 'id_service' })
    service!: BankService;

    @ManyToOne(() => ServiceDuration)
    @JoinColumn({ name: 'id_duration' })
    duration!: ServiceDuration;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}