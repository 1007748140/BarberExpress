// src/modules/users/entities/people-info.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { People } from './people.entity';

@Entity('people_info')
export class PeopleInfo {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => People)
    @JoinColumn({ name: 'people_id' })
    people!: People;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    phone!: string;

    @Column({ nullable: true })
    profile_image!: string;

    @Column()
    role_id!: number;

    @Column()
    location_id!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at!: Date;
}