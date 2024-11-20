// src/modules/products/dtos/create-payment.dto.ts
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateProductPaymentDto {
    @IsNumber()
    @IsNotEmpty({ message: 'El ID del producto es requerido' })
    productId!: number;

    @IsNumber()
    @IsNotEmpty({ message: 'La cantidad es requerida' })
    @Min(1, { message: 'La cantidad debe ser al menos 1' })
    quantity!: number;

    @IsNumber()
    @IsNotEmpty({ message: 'El método de pago es requerido' })
    paymentGatewayId!: number;
}