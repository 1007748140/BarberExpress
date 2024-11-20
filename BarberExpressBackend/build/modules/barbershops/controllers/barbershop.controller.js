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
const update_barbershop_dto_1 = require("../dtos/update-barbershop.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class BarbershopController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createBarbershopDto = (0, class_transformer_1.plainToClass)(create_barbershop_dto_1.CreateBarbershopDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createBarbershopDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const result = yield this.barbershopService.create(createBarbershopDto);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al crear la barbería',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateBarbershopDto = (0, class_transformer_1.plainToClass)(update_barbershop_dto_1.UpdateBarbershopDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updateBarbershopDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const result = yield this.barbershopService.update(Number(id), updateBarbershopDto);
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al actualizar la barbería',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.barbershopService.getById(Number(id));
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener la barbería',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getAll = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.barbershopService.getAll();
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener las barberías',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield this.barbershopService.delete(Number(id));
                res.json({ message: 'Barbería eliminada exitosamente' });
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al eliminar la barbería',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.barbershopService = new barbershop_service_1.BarbershopService();
    }
}
exports.BarbershopController = BarbershopController;
//# sourceMappingURL=barbershop.controller.js.map