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
exports.ReviewService = void 0;
const database_1 = require("../../../config/database");
const review_entity_1 = require("../entities/review.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
const barbershop_entity_1 = require("../../barbershops/entities/barbershop.entity");
class ReviewService {
    constructor() {
        this.reviewRepository = database_1.AppDataSource.getRepository(review_entity_1.Review);
        this.userRepository = database_1.AppDataSource.getRepository(user_entity_1.User);
        this.barbershopRepository = database_1.AppDataSource.getRepository(barbershop_entity_1.Barbershop);
    }
    create(userId, createReviewDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: userId }
            });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const barbershop = yield this.barbershopRepository.findOne({
                where: { id: createReviewDto.barbershopId }
            });
            if (!barbershop) {
                throw new Error('Barbería no encontrada');
            }
            const existingReview = yield this.reviewRepository.findOne({
                where: {
                    user: { id: userId },
                    barbershop: { id: createReviewDto.barbershopId }
                }
            });
            if (existingReview) {
                throw new Error('Ya has publicado una reseña para esta barbería');
            }
            const review = this.reviewRepository.create({
                user,
                barbershop,
                comment: createReviewDto.comment,
                rating: createReviewDto.rating
            });
            return yield this.reviewRepository.save(review);
        });
    }
    getBarbershopReviews(barbershopId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.reviewRepository.find({
                where: { barbershop: { id: barbershopId } },
                relations: ['user'],
                order: { createdAt: 'DESC' }
            });
        });
    }
}
exports.ReviewService = ReviewService;
//# sourceMappingURL=review.service.js.map