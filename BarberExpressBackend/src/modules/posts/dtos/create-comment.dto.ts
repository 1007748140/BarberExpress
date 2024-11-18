// src/modules/posts/dtos/create-comment.dto.ts
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty({ message: 'El comentario es requerido' })
    comment!: string;
}