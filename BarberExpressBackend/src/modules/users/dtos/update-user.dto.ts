// src/modules/users/dtos/update-user.dto.ts
import { IsString, IsOptional, IsNumber } from 'class-validator';

export class UpdateUserDto {
    @IsString()
    @IsOptional()
    first_name?: string;

    @IsString()
    @IsOptional()
    last_name?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    profile_image?: string;

    @IsNumber()
    @IsOptional()
    country_id?: number;

    @IsNumber()
    @IsOptional()
    state_id?: number;

    @IsNumber()
    @IsOptional()
    latitude?: number;

    @IsNumber()
    @IsOptional()
    longitude?: number;
}