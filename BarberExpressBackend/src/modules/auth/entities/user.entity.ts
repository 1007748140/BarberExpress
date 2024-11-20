// src/modules/auth/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { UserRole } from './user-role.entity';
import { BarberStatus } from './barber-status.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @ManyToOne(() => BarberStatus)
    @JoinColumn({ name: 'id_barber_state' })
    barberState!: BarberStatus;

    @OneToMany(() => UserRole, userRole => userRole.user)
    userRoles!: UserRole[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}