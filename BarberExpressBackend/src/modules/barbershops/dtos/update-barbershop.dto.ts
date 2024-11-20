// src/modules/barbershops/dtos/update-barbershop.dto.ts
import { IsString, IsNumber, IsUrl, IsOptional } from 'class-validator';

export class UpdateBarbershopDto {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsUrl()
    @IsOptional()
    imageBanner?: string;

    @IsNumber()
    @IsOptional()
    stateId?: number;
}