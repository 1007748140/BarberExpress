// src/modules/profiles/entities/profile.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';

@Entity('people')
export class Profile {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user!: User;

    @Column({ name: 'first_name' })
    firstName!: string;

    @Column({ name: 'last_name' })
    lastName!: string;

    @Column()
    phone!: string;

    @Column({ name: 'profile_image', nullable: true })
    profileImage?: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt!: Date;
  
    @Column({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt!: Date;
  }