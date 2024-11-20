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
exports.PostController = void 0;
const post_service_1 = require("../services/post.service");
const create_post_dto_1 = require("../dtos/create-post.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class PostController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const createPostDto = (0, class_transformer_1.plainToClass)(create_post_dto_1.CreatePostDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createPostDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const result = yield this.postService.create(req.user.id, createPostDto);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al crear la publicación',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getBarbershopPosts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { barbershopId } = req.params;
                const result = yield this.postService.getBarbershopPosts(Number(barbershopId));
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener las publicaciones',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.postService.getById(Number(id));
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener la publicación',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.postService.delete(Number(id));
                res.json({ message: 'Publicación eliminada exitosamente' });
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al eliminar la publicación',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.postService = new post_service_1.PostService();
    }
}
exports.PostController = PostController;
//# sourceMappingURL=post.controller.js.map