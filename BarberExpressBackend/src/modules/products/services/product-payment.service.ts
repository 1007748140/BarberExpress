// src/modules/products/services/product-payment.service.ts
import { AppDataSource } from '../../../config/database';
import { ProductPayment } from '../entities/product-payment.entity';
import { BarbershopProduct } from '../entities/barbershop-product.entity';
import { PaymentStatus } from '../../appointments/entities/payment-status.entity';
import { PaymentGateway } from '../../appointments/entities/payment-gateway.entity';
import { CommissionValueProduct } from '../entities/commission-value-product.entity';
import { CreateProductPaymentDto } from '../dtos/create-payment.dto';
import { User } from '../../auth/entities/user.entity';

export class ProductPaymentService {
    private paymentRepository = AppDataSource.getRepository(ProductPayment);
    private userRepository = AppDataSource.getRepository(User);
    private barbershopProductRepository = AppDataSource.getRepository(BarbershopProduct);
    private paymentStatusRepository = AppDataSource.getRepository(PaymentStatus);
    private paymentGatewayRepository = AppDataSource.getRepository(PaymentGateway);
    private commissionRepository = AppDataSource.getRepository(CommissionValueProduct);

    async createPayment(
        userId: number,
        createPaymentDto: CreateProductPaymentDto
    ): Promise<ProductPayment> {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const barbershopProduct = await this.barbershopProductRepository.findOne({
            where: { id: createPaymentDto.productId },
            relations: ['product', 'barbershop', 'inventory']
        });

        if (!barbershopProduct) {
            throw new Error('Producto no encontrado');
        }

        // Verificar inventario
        if (barbershopProduct.inventory.quantity < createPaymentDto.quantity) {
            throw new Error('No hay suficiente stock disponible');
        }

        const paymentGateway = await this.paymentGatewayRepository.findOne({
            where: { id: createPaymentDto.paymentGatewayId }
        });

        if (!paymentGateway) {
            throw new Error('Método de pago no encontrado');
        }

        // Obtener estado inicial del pago (Pendiente)
        const initialStatus = await this.paymentStatusRepository.findOne({
            where: { status: 'Pendiente' }
        });

        if (!initialStatus) {
            throw new Error('Estado de pago no encontrado');
        }

        // Obtener comisión actual
        const commission = await this.commissionRepository.findOne({
            where: { id: 1 }
        });

        if (!commission) {
            throw new Error('Valor de comisión no encontrado');
        }

        // Calcular totales
        const total = barbershopProduct.product.price * createPaymentDto.quantity;
        const commissionAmount = (total * commission.value) / 100;
        const totalReceiveBarbershop = total - commissionAmount;

        // Crear el pago
        const payment = this.paymentRepository.create({
            user,
            barbershop: barbershopProduct.barbershop,
            product: barbershopProduct,
            paymentGateway,
            paymentStatus: initialStatus,
            quantity: createPaymentDto.quantity,
            total,
            totalReceiveBarbershop,
            commission
        });

        const savedPayment = await this.paymentRepository.save(payment);

        // Actualizar inventario
        barbershopProduct.inventory.quantity -= createPaymentDto.quantity;
        await this.barbershopProductRepository.save(barbershopProduct);

        return savedPayment;
    }

    async getUserPayments(userId: number): Promise<ProductPayment[]> {
        return await this.paymentRepository.find({
            where: { user: { id: userId } },
            relations: ['product', 'product.product', 'barbershop', 'paymentStatus'],
            order: { createdAt: 'DESC' }
        });
    }
}