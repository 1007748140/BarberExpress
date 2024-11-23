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
exports.ProfileService = void 0;
const database_1 = require("../../../config/database");
const profile_entity_1 = require("../entities/profile.entity");
const exceptions_1 = require("../../core/exceptions");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ProfileService {
    constructor() {
        this.profileRepository = database_1.AppDataSource.getRepository(profile_entity_1.Profile);
    }
    getProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield this.profileRepository.findOne({
                    where: { user: { id: userId } },
                    relations: ['user'],
                });
                if (!profile) {
                    throw new exceptions_1.NotFoundException(`Perfil no encontrado para el usuario ${userId}`);
                }
                return profile;
            }
            catch (error) {
                if (error instanceof exceptions_1.NotFoundException) {
                    throw error;
                }
                throw new Error('Error al obtener el perfil');
            }
        });
    }
    updateProfile(userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield this.getProfile(userId);
                if (updateData.profileImage && profile.profileImage) {
                    const oldImagePath = path_1.default.join(__dirname, '../../../', profile.profileImage.replace(/^\//, ''));
                    if (fs_1.default.existsSync(oldImagePath)) {
                        fs_1.default.unlinkSync(oldImagePath);
                    }
                }
                Object.assign(profile, {
                    firstName: updateData.firstName || profile.firstName,
                    lastName: updateData.lastName || profile.lastName,
                    phone: updateData.phone || profile.phone,
                    profileImage: updateData.profileImage !== undefined ? updateData.profileImage : profile.profileImage,
                });
                return yield this.profileRepository.save(profile);
            }
            catch (error) {
                if (error instanceof exceptions_1.NotFoundException) {
                    throw error;
                }
                throw new Error('Error al actualizar el perfil');
            }
        });
    }
    updateProfileImage(userId, imageUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield this.getProfile(userId);
                if (profile.profileImage && imageUrl) {
                    const oldImagePath = path_1.default.join(__dirname, '../../../', profile.profileImage.replace(/^\//, ''));
                    if (fs_1.default.existsSync(oldImagePath)) {
                        fs_1.default.unlinkSync(oldImagePath);
                    }
                }
                profile.profileImage = imageUrl;
                return yield this.profileRepository.save(profile);
            }
            catch (error) {
                if (error instanceof exceptions_1.NotFoundException) {
                    throw error;
                }
                throw new Error('Error al actualizar la imagen de perfil');
            }
        });
    }
    validateProfileData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data.phone && !/^\d{10}$/.test(data.phone)) {
                throw new exceptions_1.BadRequestException('El número de teléfono debe tener 10 dígitos');
            }
            if (data.firstName && (data.firstName.length < 2 || data.firstName.length > 50)) {
                throw new exceptions_1.BadRequestException('El nombre debe tener entre 2 y 50 caracteres');
            }
            if (data.lastName && (data.lastName.length < 2 || data.lastName.length > 50)) {
                throw new exceptions_1.BadRequestException('El apellido debe tener entre 2 y 50 caracteres');
            }
        });
    }
    deleteProfile(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profile = yield this.getProfile(userId);
                if (profile.profileImage) {
                    const imagePath = path_1.default.join(__dirname, '../../../', profile.profileImage.replace(/^\//, ''));
                    if (fs_1.default.existsSync(imagePath)) {
                        fs_1.default.unlinkSync(imagePath);
                    }
                }
                yield this.profileRepository.remove(profile);
            }
            catch (error) {
                if (error instanceof exceptions_1.NotFoundException) {
                    throw error;
                }
                throw new Error('Error al eliminar el perfil');
            }
        });
    }
}
exports.ProfileService = ProfileService;
//# sourceMappingURL=profile.service.js.map