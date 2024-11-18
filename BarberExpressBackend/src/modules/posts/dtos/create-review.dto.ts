// src/modules/posts/dtos/create-review.dto.ts
import { IsNotEmpty, IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateReviewDto {
    @IsNumber()
    @IsNotEmpty({ message: 'El ID de la barbería es requerido' })
    barbershopId!: number;

    @IsString()
    @IsNotEmpty({ message: 'El comentario es requerido' })
    comment!: string;

    @IsNumber()
    @Min(1, { message: 'La calificación debe ser mínimo 1' })
    @Max(5, { message: 'La calificación debe ser máximo 5' })
    @IsNotEmpty({ message: 'La calificación es requerida' })
    rating!: number;
}