// src/modules/posts/controllers/post.controller.ts
import { Request, Response } from 'express';
import { PostService } from '../services/post.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthenticatedRequest } from '../../../middlewares/auth.middleware';

export class PostController {
    private postService: PostService;

    constructor() {
        this.postService = new PostService();
    }

    create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            if (!req.user?.id) {
                res.status(401).json({ message: 'Usuario no autenticado' });
                return;
            }

            const createPostDto = plainToClass(CreatePostDto, req.body);
            const errors = await validate(createPostDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.postService.create(req.user.id, createPostDto);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al crear la publicación',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getBarbershopPosts = async (req: Request, res: Response): Promise<void> => {
        try {
            const { barbershopId } = req.params;
            const result = await this.postService.getBarbershopPosts(Number(barbershopId));
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener las publicaciones',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const result = await this.postService.getById(Number(id));
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener la publicación',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    delete = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await this.postService.delete(Number(id));
            res.json({ message: 'Publicación eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar la publicación',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}