// src/modules/user-info/dtos/create-user-location.dto.ts
import { IsNotEmpty, IsNumber, IsDecimal } from 'class-validator';

export class CreateUserLocationDto {
    @IsNumber()
    @IsNotEmpty({ message: 'El ID del país es requerido' })
    countryId!: number;

    @IsNumber()
    @IsNotEmpty({ message: 'El ID del departamento es requerido' })
    departmentId!: number;

    @IsDecimal({ decimal_digits: '7' })
    @IsNotEmpty({ message: 'La latitud es requerida' })
    latitude!: number;

    @IsDecimal({ decimal_digits: '7' })
    @IsNotEmpty({ message: 'La longitud es requerida' })
    longitude!: number;
}