// src/modules/user-info/entities/user-location.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Country } from './country.entity';
import { Department } from './department.entity';

@Entity('user_location')
export class UserLocation {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user!: User;

    @ManyToOne(() => Country)
    @JoinColumn({ name: 'id_country' })
    country!: Country;

    @ManyToOne(() => Department)
    @JoinColumn({ name: 'id_department' })
    department!: Department;

    @Column('decimal', { precision: 10, scale: 7 })
    latitude!: number;

    @Column('decimal', { precision: 10, scale: 7 })
    longitude!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}