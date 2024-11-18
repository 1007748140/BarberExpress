// src/modules/products/entities/barbershop-product.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Barbershop } from '../../barbershops/entities/barbershop.entity';
import { BankProduct } from './bank-product.entity';
import { Inventory } from './inventory.entity';

@Entity('barbershop_products')
export class BarbershopProduct {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Barbershop)
    @JoinColumn({ name: 'id_barbershop' })
    barbershop!: Barbershop;

    @ManyToOne(() => BankProduct)
    @JoinColumn({ name: 'id_product' })
    product!: BankProduct;

    @OneToOne(() => Inventory, inventory => inventory.barbershopProduct)
    inventory!: Inventory;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}