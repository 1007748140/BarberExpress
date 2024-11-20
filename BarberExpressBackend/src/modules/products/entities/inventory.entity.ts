// src/modules/products/entities/inventory.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BarbershopProduct } from './barbershop-product.entity';

@Entity('inventory')
export class Inventory {
    @PrimaryGeneratedColumn()
    id!: number;

    @OneToOne(() => BarbershopProduct)
    @JoinColumn({ name: 'id_barbershop_product' })
    barbershopProduct!: BarbershopProduct;

    @Column()
    quantity!: number;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}