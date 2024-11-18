// src/modules/auth/entities/barber-status.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('barber_status')
export class BarberStatus {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    status!: string;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}