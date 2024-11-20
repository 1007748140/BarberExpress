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
exports.ReviewController = void 0;
const review_service_1 = require("../services/review.service");
const create_review_dto_1 = require("../dtos/create-review.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ReviewController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const createReviewDto = (0, class_transformer_1.plainToClass)(create_review_dto_1.CreateReviewDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createReviewDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const result = yield this.reviewService.create(req.user.id, createReviewDto);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al crear la reseña',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getBarbershopReviews = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { barbershopId } = req.params;
                const result = yield this.reviewService.getBarbershopReviews(Number(barbershopId));
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener las reseñas',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.reviewService = new review_service_1.ReviewService();
    }
}
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map