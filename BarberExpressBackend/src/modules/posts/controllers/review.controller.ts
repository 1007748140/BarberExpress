// src/modules/posts/controllers/review.controller.ts
import { Response } from 'express';
import { ReviewService } from '../services/review.service';
import { CreateReviewDto } from '../dtos/create-review.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthenticatedRequest } from '../../../middlewares/auth.middleware';

export class ReviewController {
    private reviewService: ReviewService;

    constructor() {
        this.reviewService = new ReviewService();
    }

    create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            if (!req.user?.id) {
                res.status(401).json({ message: 'Usuario no autenticado' });
                return;
            }

            const createReviewDto = plainToClass(CreateReviewDto, req.body);
            const errors = await validate(createReviewDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.reviewService.create(req.user.id, createReviewDto);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al crear la reseña',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getBarbershopReviews = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { barbershopId } = req.params;
            const result = await this.reviewService.getBarbershopReviews(Number(barbershopId));
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener las reseñas',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}