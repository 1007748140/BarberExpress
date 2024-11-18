// src/modules/appointments/dtos/update-appointment.dto.ts
import { IsOptional, IsString } from 'class-validator';

export class UpdateAppointmentDto {
    @IsString()
    @IsOptional()
    status?: string;
}