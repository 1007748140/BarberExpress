// src/middlewares/upload.middleware.ts
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Interfaz para extender Request y agregar el usuario
interface RequestWithUser extends Request {
  user?: {
    id: number;
    email: string;
    roles: string[];
  };
}

const storage = multer.diskStorage({
  destination: (req: RequestWithUser, _file: Express.Multer.File, cb: Function) => {
    // Asegurar que el usuario está presente en la solicitud
    if (!req.user) {
      cb(new Error('Usuario no autenticado'), '');
      return;
    }

    const userId = req.user.id;
    const baseDir = path.join(__dirname, '../../uploads');
    const userDir = path.join(baseDir, 'profiles', userId.toString());
    
    // Crear directorios si no existen
    if (!fs.existsSync(baseDir)) {
      fs.mkdirSync(baseDir, { recursive: true });
    }
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    cb(null, userDir);
  },
  filename: (_req: Request, file: Express.Multer.File, cb: Function) => {
    // Generar nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `profile-${uniqueSuffix}${ext}`);
  }
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: Function) => {
  // Validar tipo de archivo
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se permiten imágenes (JPEG, PNG, GIF)'), false);
  }
};

export const uploadProfile = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1 // Máximo 1 archivo
  },
  fileFilter: fileFilter
});

// Función de utilidad para limpiar archivos antiguos
export const cleanOldProfileImages = async (userDir: string, keepFile?: string) => {
  try {
    if (!fs.existsSync(userDir)) return;

    const files = fs.readdirSync(userDir);
    for (const file of files) {
      if (keepFile && file === path.basename(keepFile)) continue;
      fs.unlinkSync(path.join(userDir, file));
    }
  } catch (error) {
    console.error('Error al limpiar imágenes antiguas:', error);
  }
};