// src/modules/products/entities/product-payment.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Barbershop } from '../../barbershops/entities/barbershop.entity';
import { BarbershopProduct } from './barbershop-product.entity';
import { PaymentGateway } from '../../appointments/entities/payment-gateway.entity';
import { PaymentStatus } from '../../appointments/entities/payment-status.entity';
import { CommissionValueProduct } from './commission-value-product.entity';

@Entity('product_payments')
export class ProductPayment {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'id_user' })
    user!: User;

    @ManyToOne(() => Barbershop)
    @JoinColumn({ name: 'id_barbershop' })
    barbershop!: Barbershop;

    @ManyToOne(() => BarbershopProduct)
    @JoinColumn({ name: 'id_product' })
    product!: BarbershopProduct;

    @ManyToOne(() => PaymentGateway)
    @JoinColumn({ name: 'id_payment_gateways' })
    paymentGateway!: PaymentGateway;

    @ManyToOne(() => PaymentStatus)
    @JoinColumn({ name: 'id_payment_status' })
    paymentStatus!: PaymentStatus;

    @Column()
    quantity!: number;

    @Column('decimal', { precision: 10, scale: 2 })
    total!: number;

    @Column('decimal', { precision: 10, scale: 2, name: 'total_receive_barbershop' })
    totalReceiveBarbershop!: number;

    @ManyToOne(() => CommissionValueProduct)
    @JoinColumn({ name: 'id_commission_product' })
    commission!: CommissionValueProduct;

    @CreateDateColumn({ name: 'created_at' })
    createdAt!: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt!: Date;
}