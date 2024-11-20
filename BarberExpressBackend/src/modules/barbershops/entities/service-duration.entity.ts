// src/modules/barbershops/entities/service-duration.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('services_duration')
export class ServiceDuration {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    duration!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}