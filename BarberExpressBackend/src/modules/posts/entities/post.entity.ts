// src/modules/posts/entities/post.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Barbershop } from '../../barbershops/entities/barbershop.entity';
import { PostClassification } from './post-classification.entity';
import { Comment } from './comment.entity';

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user!: User;

    @ManyToOne(() => Barbershop)
    @JoinColumn({ name: 'id_barbershop' })
    barbershop!: Barbershop;

    @ManyToOne(() => PostClassification)
    @JoinColumn({ name: 'id_classification' })
    classification!: PostClassification;

    @Column()
    title!: string;

    @Column()
    content!: string;

    @Column({ nullable: true })
    media?: string;

    @OneToMany(() => Comment, comment => comment.post)
    comments!: Comment[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}