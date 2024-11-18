// src/modules/posts/dtos/create-post.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsOptional, IsUrl } from 'class-validator';

export class CreatePostDto {
    @IsNumber()
    @IsNotEmpty({ message: 'El ID de la barbería es requerido' })
    barbershopId!: number;

    @IsNumber()
    @IsNotEmpty({ message: 'El ID de la clasificación es requerido' })
    classificationId!: number;

    @IsString()
    @IsNotEmpty({ message: 'El título es requerido' })
    title!: string;

    @IsString()
    @IsNotEmpty({ message: 'El contenido es requerido' })
    content!: string;

    @IsUrl()
    @IsOptional()
    media?: string;
}