// src/modules/barbershops/entities/barbershop-schedule.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Barbershop } from './barbershop.entity';
import { DaysWeek } from './days-week.entity';
import { Hours } from './hours.entity';

@Entity('schedules')
export class BarbershopSchedule {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Barbershop, barbershop => barbershop.schedules)
    @JoinColumn({ name: 'id_barbershop' })
    barbershop!: Barbershop;

    @ManyToOne(() => DaysWeek)
    @JoinColumn({ name: 'id_day' })
    day!: DaysWeek;

    @ManyToOne(() => Hours)
    @JoinColumn({ name: 'id_start_hour' })
    startHour!: Hours;

    @ManyToOne(() => Hours)
    @JoinColumn({ name: 'id_end_hour' })
    endHour!: Hours;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}