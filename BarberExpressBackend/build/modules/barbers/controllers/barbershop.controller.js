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
exports.BarbershopController = void 0;
const barbershop_service_1 = require("../services/barbershop.service");
const create_barbershop_dto_1 = require("../dtos/create-barbershop.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class BarbershopController {
    constructor() {
        this.createBarbershop = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const createBarbershopDto = (0, class_transformer_1.plainToClass)(create_barbershop_dto_1.CreateBarbershopDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createBarbershopDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const barbershop = yield this.barbershopService.createBarbershop(createBarbershopDto, userId);
                res.status(201).json(barbershop);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        this.getBarbershopsByUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
                if (!userId) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const barbershops = yield this.barbershopService.getBarbershopsByUser(userId);
                res.json(barbershops);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        this.barbershopService = new barbershop_service_1.BarbershopService();
    }
}
exports.BarbershopController = BarbershopController;
//# sourceMappingURL=barbershop.controller.js.map