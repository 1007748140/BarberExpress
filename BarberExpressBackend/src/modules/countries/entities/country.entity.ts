// src/modules/countries/entities/country.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('country')
export class Country {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
}