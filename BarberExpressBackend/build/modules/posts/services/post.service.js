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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const database_1 = require("../../../config/database");
const post_entity_1 = require("../entities/post.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const barbershop_entity_1 = require("../../barbershops/entities/barbershop.entity");
const post_classification_entity_1 = require("../entities/post-classification.entity");
class PostService {
    constructor() {
        this.postRepository = database_1.AppDataSource.getRepository(post_entity_1.Post);
        this.userRepository = database_1.AppDataSource.getRepository(user_entity_1.User);
        this.barbershopRepository = database_1.AppDataSource.getRepository(barbershop_entity_1.Barbershop);
        this.classificationRepository = database_1.AppDataSource.getRepository(post_classification_entity_1.PostClassification);
    }
    create(userId, createPostDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: userId }
            });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const barbershop = yield this.barbershopRepository.findOne({
                where: { id: createPostDto.barbershopId }
            });
            if (!barbershop) {
                throw new Error('Barbería no encontrada');
            }
            const classification = yield this.classificationRepository.findOne({
                where: { id: createPostDto.classificationId }
            });
            if (!classification) {
                throw new Error('Clasificación no encontrada');
            }
            const post = this.postRepository.create({
                user,
                barbershop,
                classification,
                title: createPostDto.title,
                content: createPostDto.content,
                media: createPostDto.media
            });
            return yield this.postRepository.save(post);
        });
    }
    getBarbershopPosts(barbershopId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.postRepository.find({
                where: { barbershop: { id: barbershopId } },
                relations: ['user', 'classification', 'comments'],
                order: { createdAt: 'DESC' }
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.postRepository.findOne({
                where: { id },
                relations: ['user', 'barbershop', 'classification', 'comments', 'comments.user']
            });
            if (!post) {
                throw new Error('Publicación no encontrada');
            }
            return post;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.postRepository.delete(id);
            if (result.affected === 0) {
                throw new Error('Publicación no encontrada');
            }
        });
    }
}
exports.PostService = PostService;
//# sourceMappingURL=post.service.js.map