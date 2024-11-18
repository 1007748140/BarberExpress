// src/modules/profiles/dtos/create-profile.dto.ts
import { IsNotEmpty, IsString, IsOptional, IsUrl, Length } from 'class-validator';

export class CreateProfileDto {
    @IsString()
    @IsNotEmpty({ message: 'El nombre es requerido' })
    firstName!: string;

    @IsString()
    @IsNotEmpty({ message: 'El apellido es requerido' })
    lastName!: string;

    @IsString()
    @IsNotEmpty({ message: 'El teléfono es requerido' })
    @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
    phone!: string;

    @IsUrl()
    @IsOptional()
    profileImage?: string;
}