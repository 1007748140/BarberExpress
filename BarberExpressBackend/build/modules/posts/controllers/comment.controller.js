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
exports.CommentController = void 0;
const comment_service_1 = require("../services/comment.service");
const create_comment_dto_1 = require("../dtos/create-comment.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class CommentController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const { postId } = req.params;
                const createCommentDto = (0, class_transformer_1.plainToClass)(create_comment_dto_1.CreateCommentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createCommentDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const result = yield this.commentService.create(req.user.id, Number(postId), createCommentDto);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al crear el comentario',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getPostComments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { postId } = req.params;
                const result = yield this.commentService.getPostComments(Number(postId));
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener los comentarios',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.commentService.delete(Number(id));
                res.json({ message: 'Comentario eliminado exitosamente' });
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al eliminar el comentario',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.commentService = new comment_service_1.CommentService();
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=comment.controller.js.map