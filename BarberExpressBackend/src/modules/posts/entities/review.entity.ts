// src/modules/posts/entities/review.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Barbershop } from '../../barbershops/entities/barbershop.entity';

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user!: User;

    @ManyToOne(() => Barbershop)
    @JoinColumn({ name: 'id_barbershop' })
    barbershop!: Barbershop;

    @Column()
    comment!: string;

    @Column()
    rating!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}