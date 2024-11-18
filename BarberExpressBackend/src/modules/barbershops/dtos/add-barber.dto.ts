// src/modules/barbershops/dtos/add-barber.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class AddBarberDto {
    @IsNumber()
    @IsNotEmpty({ message: 'El ID del barbero es requerido' })
    barberId!: number;
}