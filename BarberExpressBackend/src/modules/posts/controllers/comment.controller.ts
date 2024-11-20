// src/modules/posts/controllers/comment.controller.ts
import { Response } from 'express';
import { CommentService } from '../services/comment.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthenticatedRequest } from '../../../middlewares/auth.middleware';

export class CommentController {
    private commentService: CommentService;

    constructor() {
        this.commentService = new CommentService();
    }

    create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            if (!req.user?.id) {
                res.status(401).json({ message: 'Usuario no autenticado' });
                return;
            }

            const { postId } = req.params;
            const createCommentDto = plainToClass(CreateCommentDto, req.body);
            const errors = await validate(createCommentDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.commentService.create(
                req.user.id,
                Number(postId),
                createCommentDto
            );
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al crear el comentario',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getPostComments = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { postId } = req.params;
            const result = await this.commentService.getPostComments(Number(postId));
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los comentarios',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    delete = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await this.commentService.delete(Number(id));
            res.json({ message: 'Comentario eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar el comentario',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}