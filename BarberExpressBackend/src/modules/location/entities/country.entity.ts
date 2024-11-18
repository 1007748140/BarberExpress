// src/modules/location/entities/country.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Department } from './department.entity';

@Entity('countries')
export class Country {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @OneToMany(() => Department, department => department.country)
    departments!: Department[];
}