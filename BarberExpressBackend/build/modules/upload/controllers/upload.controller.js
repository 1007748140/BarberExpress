"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadController = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}${path_1.default.extname(file.originalname)}`);
    }
});
const fileFilter = (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    }
    else {
        cb(new Error('El archivo debe ser una imagen'));
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
class UploadController {
    constructor() {
        this.uploadImage = upload.single('image');
        this.handleUpload = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const multerReq = req;
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
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Error al subir la imagen',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.handleMulterError = (error, _req, res, next) => {
            if (error instanceof multer_1.default.MulterError) {
                if (error.code === 'LIMIT_FILE_SIZE') {
                    res.status(400).json({
                        success: false,
                        message: 'El archivo es demasiado grande. Máximo 5MB'
                    });
                }
                else {
                    res.status(400).json({
                        success: false,
                        message: 'Error al subir el archivo',
                        error: error.message
                    });
                }
            }
            else if (error instanceof Error) {
                res.status(400).json({
                    success: false,
                    message: error.message
                });
            }
            else {
                next();
            }
        };
    }
}
exports.UploadController = UploadController;
//# sourceMappingURL=upload.controller.js.map