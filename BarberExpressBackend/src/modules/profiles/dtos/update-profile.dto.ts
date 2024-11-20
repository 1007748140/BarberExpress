// src/modules/profiles/dtos/update-profile.dto.ts
import { IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDto } from './create-profile.dto';

export class UpdateProfileDto extends PartialType(CreateProfileDto) {
    @IsString()
    @IsOptional()
    firstName?: string;

    @IsString()
    @IsOptional()
    lastName?: string;

    @IsString()
    @IsOptional()
    @Length(10, 10, { message: 'El teléfono debe tener 10 dígitos' })
    phone?: string;

    @IsUrl()
    @IsOptional()
    profileImage?: string;
}