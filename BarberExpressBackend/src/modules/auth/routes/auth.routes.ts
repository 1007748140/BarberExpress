// src/modules/auth/routes/auth.routes.ts
import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = Router();
const authController = new AuthController();

// Rutas de autenticación
router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;