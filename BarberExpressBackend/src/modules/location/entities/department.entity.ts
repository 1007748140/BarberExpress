// src/modules/location/entities/department.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Country } from './country.entity';

@Entity('departments')
export class Department {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToOne(() => Country)
    @JoinColumn({ name: 'id_country' })
    country!: Country;
}