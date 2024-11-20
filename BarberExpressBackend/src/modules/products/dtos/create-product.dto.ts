// src/modules/products/dtos/create-product.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBarbershopProductDto {
    @IsNumber()
    @IsNotEmpty({ message: 'El ID de la barbería es requerido' })
    barbershopId!: number;

    @IsNumber()
    @IsNotEmpty({ message: 'El ID del producto es requerido' })
    bankProductId!: number;

    @IsNumber()
    @IsNotEmpty({ message: 'La cantidad inicial es requerida' })
    initialQuantity!: number;
}