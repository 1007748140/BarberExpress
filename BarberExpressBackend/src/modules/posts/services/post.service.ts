// src/modules/posts/services/post.service.ts
import { AppDataSource } from '../../../config/database';
import { Post } from '../entities/post.entity';
import { User } from '../../auth/entities/user.entity';
import { Barbershop } from '../../barbershops/entities/barbershop.entity';
import { PostClassification } from '../entities/post-classification.entity';
import { CreatePostDto } from '../dtos/create-post.dto';

export class PostService {
    private postRepository = AppDataSource.getRepository(Post);
    private userRepository = AppDataSource.getRepository(User);
    private barbershopRepository = AppDataSource.getRepository(Barbershop);
    private classificationRepository = AppDataSource.getRepository(PostClassification);

    async create(userId: number, createPostDto: CreatePostDto): Promise<Post> {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const barbershop = await this.barbershopRepository.findOne({
            where: { id: createPostDto.barbershopId }
        });

        if (!barbershop) {
            throw new Error('Barbería no encontrada');
        }

        const classification = await this.classificationRepository.findOne({
            where: { id: createPostDto.classificationId }
        });

        if (!classification) {
            throw new Error('Clasificación no encontrada');
        }

        const post = this.postRepository.create({
            user,
            barbershop,
            classification,
            title: createPostDto.title,
            content: createPostDto.content,
            media: createPostDto.media
        });

        return await this.postRepository.save(post);
    }

    async getBarbershopPosts(barbershopId: number): Promise<Post[]> {
        return await this.postRepository.find({
            where: { barbershop: { id: barbershopId } },
            relations: ['user', 'classification', 'comments'],
            order: { createdAt: 'DESC' }
        });
    }

    async getById(id: number): Promise<Post> {
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ['user', 'barbershop', 'classification', 'comments', 'comments.user']
        });

        if (!post) {
            throw new Error('Publicación no encontrada');
        }

        return post;
    }

    async delete(id: number): Promise<void> {
        const result = await this.postRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Publicación no encontrada');
        }
    }
}