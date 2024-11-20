// src/modules/posts/routes/post.routes.ts
import { Router } from 'express';
import { PostController } from '../controllers/post.controller';
import { CommentController } from '../controllers/comment.controller';
import { ReviewController } from '../controllers/review.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const router = Router();
const postController = new PostController();
const commentController = new CommentController();
const reviewController = new ReviewController();

// Rutas para posts
router.post(
    '/',
    authMiddleware(['Barbero', 'AdminBarberia']),
    postController.create
);

router.get(
    '/barbershop/:barbershopId',
    postController.getBarbershopPosts
);

router.get(
    '/:id',
    postController.getById
);

router.delete(
    '/:id',
    authMiddleware(['Barbero', 'AdminBarberia']),
    postController.delete
);

// Rutas para comentarios
router.post(
    '/:postId/comments',
    authMiddleware(['Cliente', 'Barbero', 'AdminBarberia']),
    commentController.create
);

router.get(
    '/:postId/comments',
    commentController.getPostComments
);

router.delete(
    '/comments/:id',
    authMiddleware(['Cliente', 'Barbero', 'AdminBarberia']),
    commentController.delete
);

// Rutas para reseñas
router.post(
    '/reviews',
    authMiddleware(['Cliente']),
    reviewController.create
);

router.get(
    '/reviews/barbershop/:barbershopId',
    reviewController.getBarbershopReviews
);

export default router;