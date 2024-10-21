import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Country } from './country.entity';
import { Department } from './department.entity';

@Entity('users_location')
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
}