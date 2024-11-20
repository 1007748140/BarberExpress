// src/modules/barbershops/entities/barbershop.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { StateBarbershop } from './state-barbershop.entity';
import { BarbershopService } from './barbershop-service.entity';
import { BarbershopBarber } from './barbershop-barber.entity';
import { BarbershopSchedule } from './barbershop-schedule.entity';
import { BarbershopProduct } from './barbershop-product.entity';

@Entity('barbershops')
export class Barbershop {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user!: User;

    @ManyToOne(() => StateBarbershop)
    @JoinColumn({ name: 'id_state_barbershops' })
    state!: StateBarbershop;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column({ name: 'image_banner' })
    imageBanner!: string;

    @OneToMany(() => BarbershopService, service => service.barbershop)
    services!: BarbershopService[];

    @OneToMany(() => BarbershopBarber, barber => barber.barbershop)
    barbers!: BarbershopBarber[];

    @OneToMany(() => BarbershopSchedule, schedule => schedule.barbershop)
    schedules!: BarbershopSchedule[];

    @OneToMany(() => BarbershopProduct, product => product.barbershop)
    products!: BarbershopProduct[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}