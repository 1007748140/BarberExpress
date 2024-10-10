// src/modules/users/routes/user.routes.ts
import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const router = Router();
const userController = new UserController();

router.post('/', userController.create);
router.get('/:id', authMiddleware, userController.findOne);
router.put('/:id', authMiddleware, userController.update);

export default router;