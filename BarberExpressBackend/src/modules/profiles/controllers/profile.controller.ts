// src/modules/profiles/controllers/profile.controller.ts
import { Request, Response } from 'express';
import { ProfileService } from '../services/profile.service';
import sharp from 'sharp';
import path from 'path';
import fs from 'fs';
import { cleanOldProfileImages } from '../../../middlewares/upload.middleware';

interface RequestWithUser extends Request {
  user?: {
    id: number;
    email: string;
    roles: string[];
  };
  file?: Express.Multer.File;
}

export class ProfileController {
  private profileService: ProfileService;

  constructor() {
    this.profileService = new ProfileService();
  }

  getProfile = async (req: RequestWithUser, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
      }

      const profile = await this.profileService.getProfile(req.user.id);
      res.json(profile);
    } catch (error) {
      console.error('Error al obtener perfil:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error al obtener el perfil'
      });
    }
  };

  updateProfile = async (req: RequestWithUser, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
      }

      const updatedProfile = await this.profileService.updateProfile(
        req.user.id,
        req.body
      );
      res.json(updatedProfile);
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error al actualizar el perfil'
      });
    }
  };

  updateProfileImage = async (req: RequestWithUser, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
      }

      if (!req.file) {
        res.status(400).json({ message: 'No se proporcionó ninguna imagen' });
        return;
      }

      const userId = req.user.id;
      const imageFile = req.file;
      const uploadDir = path.dirname(imageFile.path);

      // Nombre del archivo procesado
      const processedFileName = `processed-${path.basename(imageFile.path)}`;
      const processedImagePath = path.join(uploadDir, processedFileName);

      try {
        // Procesar y comprimir la imagen
        await sharp(imageFile.path)
          .resize(500, 500, {
            fit: 'cover',
            position: 'center'
          })
          .jpeg({ quality: 80 })
          .toFile(processedImagePath);

        // Eliminar archivo original
        fs.unlinkSync(imageFile.path);

        // Limpiar imágenes antiguas
        await cleanOldProfileImages(uploadDir, processedFileName);

        // Crear URL relativa para la base de datos
        const relativeImagePath = path.relative(
          path.join(__dirname, '../../../uploads'),
          processedImagePath
        ).replace(/\\/g, '/'); // Convertir backslashes a forward slashes para URLs

        const imageUrl = `/uploads/${relativeImagePath}`;

        // Actualizar perfil en la base de datos
        const updatedProfile = await this.profileService.updateProfileImage(
          userId,
          imageUrl
        );

        res.json({
          success: true,
          profile: updatedProfile,
          imageUrl: imageUrl
        });
      } catch (error) {
        // Limpiar archivos en caso de error
        if (fs.existsSync(imageFile.path)) {
          fs.unlinkSync(imageFile.path);
        }
        if (fs.existsSync(processedImagePath)) {
          fs.unlinkSync(processedImagePath);
        }
        throw error;
      }
    } catch (error) {
      console.error('Error al procesar imagen:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error al procesar la imagen'
      });
    }
  };

  deleteProfileImage = async (req: RequestWithUser, res: Response): Promise<void> => {
    try {
      if (!req.user?.id) {
        res.status(401).json({ message: 'Usuario no autenticado' });
        return;
      }

      const userId = req.user.id;
      const profile = await this.profileService.getProfile(userId);

      if (profile.profileImage) {
        const imagePath = path.join(
          __dirname,
          '../../../',
          profile.profileImage.replace(/^\//, '')
        );

        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      // Actualizar perfil sin imagen - aquí está el cambio
      const updatedProfile = await this.profileService.updateProfileImage(userId, undefined);

      res.json({
        success: true,
        profile: updatedProfile
      });
    } catch (error) {
      console.error('Error al eliminar imagen de perfil:', error);
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error al eliminar la imagen de perfil'
      });
    }
  };
}