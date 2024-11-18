// src/modules/barbershops/dtos/create-service.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBarbershopServiceDto {
    @IsNumber()
    @IsNotEmpty({ message: 'El ID del servicio es requerido' })
    serviceId!: number;

    @IsNumber()
    @IsNotEmpty({ message: 'La duración del servicio es requerida' })
    durationId!: number;
}