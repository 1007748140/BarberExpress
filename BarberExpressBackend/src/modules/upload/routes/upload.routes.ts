// src/modules/upload/routes/upload.routes.ts
import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller';

const router = Router();
const uploadController = new UploadController();

router.post('/image',
    (req, res, next) => {
        uploadController.uploadImage(req, res, (err) => {
            if (err) {
                uploadController.handleMulterError(err, req, res, next);
            } else {
                next();
            }
        });
    },
    uploadController.handleUpload
);

export default router;