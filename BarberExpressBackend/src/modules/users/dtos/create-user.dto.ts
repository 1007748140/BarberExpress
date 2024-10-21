// src/modules/users/dtos/create-user.dto.ts
import { IsString, IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    first_name!: string;

    @IsString()
    @IsNotEmpty()
    last_name!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsString()
    @IsNotEmpty()
    phone!: string;

    @IsNumber()
    @IsNotEmpty()
    id_role!: number;

    @IsNumber()
    @IsNotEmpty()
    id_country!: number;

    @IsNumber()
    @IsNotEmpty()
    id_department!: number;

    @IsNumber()
    @IsNotEmpty()
    latitude!: number;

    @IsNumber()
    @IsNotEmpty()
    longitude!: number;
}