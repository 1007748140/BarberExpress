// src/modules/appointments/dtos/create-appointment.dto.ts
import { IsNotEmpty, IsNumber, IsDate, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateAppointmentDto {
    @IsNumber()
    @IsNotEmpty({ message: 'El ID del barbero es requerido' })
    barberId!: number;

    @IsNumber()
    @IsNotEmpty({ message: 'El ID del servicio es requerido' })
    serviceId!: number;

    @IsDate()
    @Type(() => Date)
    @IsNotEmpty({ message: 'La fecha de la cita es requerida' })
    appointmentDate!: Date;

    @IsString()
    @IsNotEmpty({ message: 'La hora de inicio es requerida' })
    startTime!: string;

    @IsString()
    @IsNotEmpty({ message: 'La hora de finalización es requerida' })
    endTime!: string;
}