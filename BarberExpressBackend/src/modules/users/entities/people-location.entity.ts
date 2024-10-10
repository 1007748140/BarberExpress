// people-location.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { People } from './people.entity';

@Entity('people_location')
export class PeopleLocation {
  @PrimaryGeneratedColumn()
  id!: number;

  @OneToOne(() => People)
  @JoinColumn({ name: 'people_id' })
  people!: People;

  @Column()
  country_id!: number;

  @Column()
  state_id!: number;

  @Column('decimal', { precision: 10, scale: 7 })
  latitude!: number;

  @Column('decimal', { precision: 10, scale: 7 })
  longitude!: number;
}