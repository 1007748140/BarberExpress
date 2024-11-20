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
exports.CommentService = void 0;
const database_1 = require("../../../config/database");
const comment_entity_1 = require("../entities/comment.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const post_entity_1 = require("../entities/post.entity");
class CommentService {
    constructor() {
        this.commentRepository = database_1.AppDataSource.getRepository(comment_entity_1.Comment);
        this.userRepository = database_1.AppDataSource.getRepository(user_entity_1.User);
        this.postRepository = database_1.AppDataSource.getRepository(post_entity_1.Post);
    }
    create(userId, postId, createCommentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: userId }
            });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const post = yield this.postRepository.findOne({
                where: { id: postId }
            });
            if (!post) {
                throw new Error('Publicación no encontrada');
            }
            const comment = this.commentRepository.create({
                user,
                post,
                comment: createCommentDto.comment
            });
            return yield this.commentRepository.save(comment);
        });
    }
    getPostComments(postId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.commentRepository.find({
                where: { post: { id: postId } },
                relations: ['user'],
                order: { createdAt: 'DESC' }
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.commentRepository.delete(id);
            if (result.affected === 0) {
                throw new Error('Comentario no encontrado');
            }
        });
    }
}
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map