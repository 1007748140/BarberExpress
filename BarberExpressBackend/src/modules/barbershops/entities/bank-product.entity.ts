// src/modules/barbershops/entities/bank-product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ProductClassification } from './product-classification.entity';

@Entity('bank_products')
export class BankProduct {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => ProductClassification)
    @JoinColumn({ name: 'id_classification' })
    classification!: ProductClassification;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price!: number;

    @Column()
    image!: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}