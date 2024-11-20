// src/modules/barbershops/entities/days-week.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('days_week')
export class DaysWeek {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    days!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}