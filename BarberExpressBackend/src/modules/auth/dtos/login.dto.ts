// src/modules/auth/dtos/login.dto.ts
import { IsEmail, IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
    @IsEmail({}, {
        message: 'El formato del email no es válido'
    })
    @IsNotEmpty({
        message: 'El email es requerido'
    })
    email!: string;

    @IsString({
        message: 'La contraseña debe ser una cadena de texto'
    })
    @IsNotEmpty({
        message: 'La contraseña es requerida'
    })
    password!: string;
}