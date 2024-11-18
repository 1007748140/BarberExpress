// src/modules/posts/services/comment.service.ts
import { AppDataSource } from '../../../config/database';
import { Comment } from '../entities/comment.entity';
import { User } from '../../auth/entities/user.entity';
import { Post } from '../entities/post.entity';
import { CreateCommentDto } from '../dtos/create-comment.dto';

export class CommentService {
    private commentRepository = AppDataSource.getRepository(Comment);
    private userRepository = AppDataSource.getRepository(User);
    private postRepository = AppDataSource.getRepository(Post);

    async create(userId: number, postId: number, createCommentDto: CreateCommentDto): Promise<Comment> {
        const user = await this.userRepository.findOne({
            where: { id: userId }
        });

        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const post = await this.postRepository.findOne({
            where: { id: postId }
        });

        if (!post) {
            throw new Error('Publicación no encontrada');
        }

        const comment = this.commentRepository.create({
            user,
            post,
            comment: createCommentDto.comment
        });

        return await this.commentRepository.save(comment);
    }

    async getPostComments(postId: number): Promise<Comment[]> {
        return await this.commentRepository.find({
            where: { post: { id: postId } },
            relations: ['user'],
            order: { createdAt: 'DESC' }
        });
    }

    async delete(id: number): Promise<void> {
        const result = await this.commentRepository.delete(id);
        if (result.affected === 0) {
            throw new Error('Comentario no encontrado');
        }
    }
}