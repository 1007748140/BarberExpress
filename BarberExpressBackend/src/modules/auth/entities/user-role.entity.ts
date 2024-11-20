import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';

@Entity('user_roles')
export class UserRole {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User, user => user.userRoles)
    @JoinColumn({ name: 'id_user' })
    user!: User;

    @ManyToOne(() => Role)
    @JoinColumn({ name: 'id_role' })
    role!: Role;

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}