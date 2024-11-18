// src/modules/appointments/dtos/create-payment.dto.ts
import { IsNotEmpty, IsNumber, IsDecimal } from 'class-validator';

export class CreatePaymentDto {
    @IsNumber()
    @IsNotEmpty({ message: 'El ID de la cita es requerido' })
    appointmentId!: number;

    @IsNumber()
    @IsNotEmpty({ message: 'El método de pago es requerido' })
    paymentGatewayId!: number;

    @IsDecimal()
    @IsNotEmpty({ message: 'El total es requerido' })
    total!: number;
}