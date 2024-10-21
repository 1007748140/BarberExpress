// src/modules/users/entities/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'id_role' })
    role!: Role;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    phone!: string;

    @Column({ nullable: true })
    profile_image?: string;

    @Column()
    created_at!: Date;
}