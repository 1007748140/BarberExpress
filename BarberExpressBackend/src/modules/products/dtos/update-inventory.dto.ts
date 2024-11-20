// src/modules/products/dtos/update-inventory.dto.ts
import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class UpdateInventoryDto {
    @IsNumber()
    @IsNotEmpty({ message: 'La cantidad es requerida' })
    @Min(0, { message: 'La cantidad no puede ser negativa' })
    quantity!: number;
}