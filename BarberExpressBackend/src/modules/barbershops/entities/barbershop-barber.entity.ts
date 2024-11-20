// src/modules/barbershops/entities/barbershop-barber.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Barbershop } from './barbershop.entity';
import { User } from '../../auth/entities/user.entity';

@Entity('barbershop_barbers')
export class BarbershopBarber {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Barbershop, barbershop => barbershop.barbers)
    @JoinColumn({ name: 'id_barbershop' })
    barbershop!: Barbershop;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user!: User;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}