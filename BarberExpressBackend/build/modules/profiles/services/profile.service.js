"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const profile_entity_1 = require("../entities/profile.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
let ProfileService = class ProfileService {
    constructor(profileRepository, userRepository) {
        this.profileRepository = profileRepository;
        this.userRepository = userRepository;
    }
    create(createProfileDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                throw new common_1.NotFoundException('User not found');
            }
            const profile = this.profileRepository.create(Object.assign(Object.assign({}, createProfileDto), { user }));
            return yield this.profileRepository.save(profile);
        });
    }
    findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Finding profile for user ID:', userId);
            if (!userId || isNaN(userId)) {
                throw new common_1.BadRequestException('Invalid user ID');
            }
            try {
                const profile = yield this.profileRepository.findOne({
                    where: { user: { id: userId } },
                    relations: ['user'],
                });
                if (!profile) {
                    throw new common_1.NotFoundException(`Profile not found for user ID ${userId}`);
                }
                return profile;
            }
            catch (error) {
                console.error('Error finding profile:', error);
                throw error;
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield this.profileRepository.findOne({
                where: { id },
                relations: ['user'],
            });
            if (!profile) {
                throw new common_1.NotFoundException(`Profile with ID ${id} not found`);
            }
            return profile;
        });
    }
    update(userId, updateProfileDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield this.findByUserId(userId);
            if (!profile) {
                throw new common_1.NotFoundException(`Profile not found for user ID ${userId}`);
            }
            Object.assign(profile, updateProfileDto);
            return yield this.profileRepository.save(profile);
        });
    }
    remove(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield this.findOne(id);
            yield this.profileRepository.remove(profile);
        });
    }
};
exports.ProfileService = ProfileService;
exports.ProfileService = ProfileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(profile_entity_1.Profile)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ProfileService);
//# sourceMappingURL=profile.service.js.map