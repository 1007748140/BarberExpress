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
exports.ProfileController = void 0;
const profile_service_1 = require("../services/profile.service");
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const upload_middleware_1 = require("../../../middlewares/upload.middleware");
class ProfileController {
    constructor() {
        this.getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const profile = yield this.profileService.getProfile(req.user.id);
                res.json(profile);
            }
            catch (error) {
                console.error('Error al obtener perfil:', error);
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Error al obtener el perfil'
                });
            }
        });
        this.updateProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const updatedProfile = yield this.profileService.updateProfile(req.user.id, req.body);
                res.json(updatedProfile);
            }
            catch (error) {
                console.error('Error al actualizar perfil:', error);
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Error al actualizar el perfil'
                });
            }
        });
        this.updateProfileImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                if (!req.file) {
                    res.status(400).json({ message: 'No se proporcionó ninguna imagen' });
                    return;
                }
                const userId = req.user.id;
                const imageFile = req.file;
                const uploadDir = path_1.default.dirname(imageFile.path);
                const processedFileName = `processed-${path_1.default.basename(imageFile.path)}`;
                const processedImagePath = path_1.default.join(uploadDir, processedFileName);
                try {
                    yield (0, sharp_1.default)(imageFile.path)
                        .resize(500, 500, {
                        fit: 'cover',
                        position: 'center'
                    })
                        .jpeg({ quality: 80 })
                        .toFile(processedImagePath);
                    fs_1.default.unlinkSync(imageFile.path);
                    yield (0, upload_middleware_1.cleanOldProfileImages)(uploadDir, processedFileName);
                    const relativeImagePath = path_1.default.relative(path_1.default.join(__dirname, '../../../uploads'), processedImagePath).replace(/\\/g, '/');
                    const imageUrl = `/uploads/${relativeImagePath}`;
                    const updatedProfile = yield this.profileService.updateProfileImage(userId, imageUrl);
                    res.json({
                        success: true,
                        profile: updatedProfile,
                        imageUrl: imageUrl
                    });
                }
                catch (error) {
                    if (fs_1.default.existsSync(imageFile.path)) {
                        fs_1.default.unlinkSync(imageFile.path);
                    }
                    if (fs_1.default.existsSync(processedImagePath)) {
                        fs_1.default.unlinkSync(processedImagePath);
                    }
                    throw error;
                }
            }
            catch (error) {
                console.error('Error al procesar imagen:', error);
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Error al procesar la imagen'
                });
            }
        });
        this.deleteProfileImage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const userId = req.user.id;
                const profile = yield this.profileService.getProfile(userId);
                if (profile.profileImage) {
                    const imagePath = path_1.default.join(__dirname, '../../../', profile.profileImage.replace(/^\//, ''));
                    if (fs_1.default.existsSync(imagePath)) {
                        fs_1.default.unlinkSync(imagePath);
                    }
                }
                const updatedProfile = yield this.profileService.updateProfileImage(userId, undefined);
                res.json({
                    success: true,
                    profile: updatedProfile
                });
            }
            catch (error) {
                console.error('Error al eliminar imagen de perfil:', error);
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Error al eliminar la imagen de perfil'
                });
            }
        });
        this.profileService = new profile_service_1.ProfileService();
    }
}
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map