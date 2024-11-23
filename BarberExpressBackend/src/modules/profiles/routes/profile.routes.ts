// src/modules/profiles/routes/profile.routes.ts
import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { uploadProfile } from '../../../middlewares/upload.middleware';

const router = Router();
const profileController = new ProfileController();

// Middleware para asegurarse de que las rutas estén protegidas
router.use(authMiddleware());

// Ruta para obtener el perfil del usuario actual
router.get(
  '/me',
  profileController.getProfile
);

// Ruta para actualizar el perfil del usuario actual
router.put(
  '/me',
  profileController.updateProfile
);

// Ruta para actualizar la imagen de perfil
router.post(
  '/me/image',
  uploadProfile.single('image'), // Middleware de multer para procesar la imagen
  profileController.updateProfileImage
);

// Ruta para eliminar la imagen de perfil
router.delete(
  '/me/image',
  profileController.deleteProfileImage
);

export default router;