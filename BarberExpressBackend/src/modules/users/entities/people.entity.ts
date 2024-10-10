// src/modules/users/entities/people.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { PeopleInfo } from './people-info.entity';
import { PeopleLocation } from './people-location.entity';

@Entity('people')
export class People {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    first_name!: string;

    @Column()
    last_name!: string;

    @OneToOne(() => PeopleInfo, info => info.people)
    info!: PeopleInfo;

    @OneToOne(() => PeopleLocation, location => location.people)
    location!: PeopleLocation;
}