// src/config/upload.config.ts
import path from 'path';

export const uploadConfig = {
    directory: path.join(__dirname, '../../uploads'),
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif'],
    fileFilter: (file: Express.Multer.File): boolean => {
        return uploadConfig.allowedMimeTypes.includes(file.mimetype);
    }
};