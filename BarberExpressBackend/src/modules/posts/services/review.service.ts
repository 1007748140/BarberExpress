// src/modules/posts/services/review.service.ts
import { AppDataSource } from '../../../config/database';
import { Review } from '../entities/review.entity';
import { User } from '../../auth/entities/user.entity';
import { Barbershop } from '../../barbershops/entities/barbershop.entity';
import { CreateReviewDto } from '../dtos/create-review.dto';

export class ReviewService {
    private reviewRepository = AppDataSource.getRepository(Review);
    private userRepository = AppDataSource.getRepository(User);
    private barbershopRepository = AppDataSource.getRepository(Barbershop);

    async create(userId: number, createReviewDto: CreateReviewDto): Promise<Review> {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const barbershop = await this.barbershopRepository.findOne({
            where: { id: createReviewDto.barbershopId }
        });

        if (!barbershop) {
            throw new Error('Barbería no encontrada');
        }

        // Verificar si el usuario ya ha hecho una reseña para esta barbería
        const existingReview = await this.reviewRepository.findOne({
            where: {
                user: { id: userId },
                barbershop: { id: createReviewDto.barbershopId }
            }
        });

        if (existingReview) {
            throw new Error('Ya has publicado una reseña para esta barbería');
        }

        const review = this.reviewRepository.create({
            user,
            barbershop,
            comment: createReviewDto.comment,
            rating: createReviewDto.rating
        });

        return await this.reviewRepository.save(review);
    }

    async getBarbershopReviews(barbershopId: number): Promise<Review[]> {
        return await this.reviewRepository.find({
            where: { barbershop: { id: barbershopId } },
            relations: ['user'],
            order: { createdAt: 'DESC' }
        });
    }
}