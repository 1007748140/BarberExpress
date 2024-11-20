// src/modules/upload/controllers/upload.controller.ts
import { Request, Response } from 'express';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';

interface MulterRequest extends Request {
    file: Express.Multer.File;
}

// Configuración de multer
const storage = multer.diskStorage({
    destination: (_req: Express.Request, _file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
        cb(null, 'uploads/');
    },
    filename: (_req: Express.Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
        // Generar nombre único para el archivo
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// Filtro de archivos
const fileFilter = (_req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    // Aceptar solo imágenes
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('El archivo debe ser una imagen'));
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Límite de 5MB
    }
});

export class UploadController {
    uploadImage = upload.single('image');

    handleUpload = async (req: Request, res: Response): Promise<void> => {
        try {
            const multerReq = req as MulterRequest;
            
            if (!multerReq.file) {
                res.status(400).json({ 
                    success: false,
                    message: 'No se proporcionó ninguna imagen' 
                });
                return;
            }

            res.json({
                success: true,
                imageUrl: `/uploads/${multerReq.file.filename}`
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al subir la imagen',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    // Método para manejar errores de multer
    handleMulterError = (error: any, _req: Request, res: Response, next: Function) => {
        if (error instanceof multer.MulterError) {
            if (error.code === 'LIMIT_FILE_SIZE') {
                res.status(400).json({
                    success: false,
                    message: 'El archivo es demasiado grande. Máximo 5MB'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Error al subir el archivo',
                    error: error.message
                });
            }
        } else if (error instanceof Error) {
            res.status(400).json({
                success: false,
                message: error.message
            });
        } else {
            next();
        }
    };
}