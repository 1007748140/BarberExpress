// src/modules/roles/entities/role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
}