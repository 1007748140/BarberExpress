// src/modules/barbershops/dtos/create-barbershop.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsUrl } from 'class-validator';

export class CreateBarbershopDto {
    @IsNumber()
    @IsNotEmpty({ message: 'El ID del usuario es requerido' })
    userId!: number;

    @IsString()
    @IsNotEmpty({ message: 'El nombre es requerido' })
    name!: string;

    @IsString()
    @IsNotEmpty({ message: 'La descripción es requerida' })
    description!: string;

    @IsUrl()
    @IsNotEmpty({ message: 'La imagen del banner es requerida' })
    imageBanner!: string;
}