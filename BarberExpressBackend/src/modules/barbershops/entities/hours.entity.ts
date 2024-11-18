// src/modules/barbershops/entities/hours.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('hours')
export class Hours {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ nullable: true })
    hour?: string;

    @Column({ nullable: true })
    minutes?: string;

    @Column({ nullable: true })
    periodo?: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}