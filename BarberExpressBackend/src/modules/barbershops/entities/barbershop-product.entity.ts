// src/modules/barbershops/entities/barbershop-product.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Barbershop } from './barbershop.entity';
import { BankProduct } from './bank-product.entity';

@Entity('barbershop_products')
export class BarbershopProduct {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Barbershop, barbershop => barbershop.products)
    @JoinColumn({ name: 'id_barbershop' })
    barbershop!: Barbershop;

    @ManyToOne(() => BankProduct)
    @JoinColumn({ name: 'id_product' })
    product!: BankProduct;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}