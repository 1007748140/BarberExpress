// src/modules/barbershops/entities/bank-service.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ServiceClassification } from './service-classification.entity';

@Entity('bank_services')
export class BankService {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => ServiceClassification)
    @JoinColumn({ name: 'id_classification' })
    classification!: ServiceClassification;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}
