// src/modules/auth/dtos/register.dto.ts
import { IsNotEmpty, IsString, IsEmail, IsNumber, IsOptional, IsIn } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, {
        message: 'El formato del email no es válido'
    })
    @IsNotEmpty({
        message: 'El email es requerido'
    })
    readonly email!: string;

    @IsString({
        message: 'La contraseña debe ser una cadena de texto'
    })
    @IsNotEmpty({
        message: 'La contraseña es requerida'
    })
    readonly password!: string;

    @IsString()
    @IsNotEmpty()
    @IsIn(['Cliente', 'Barbero', 'AdminBarberia'], {
        message: 'El rol debe ser Cliente, Barbero o AdminBarberia'
    })
    readonly role!: string;

    @IsString()
    @IsNotEmpty()
    readonly firstName!: string;

    @IsString()
    @IsNotEmpty()
    readonly lastName!: string;

    @IsString()
    @IsNotEmpty()
    readonly phone!: string;

    @IsString()
    @IsOptional()
    readonly profileImage?: string;

    @IsNumber()
    @IsNotEmpty()
    readonly latitude!: number;

    @IsNumber()
    @IsNotEmpty()
    readonly longitude!: number;

    @IsNumber()
    @IsNotEmpty()
    readonly countryId!: number;

    @IsNumber()
    @IsNotEmpty()
    readonly departmentId!: number;
}