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
exports.BarbershopServiceController = void 0;
const barbershop_service_service_1 = require("../services/barbershop-service.service");
const create_service_dto_1 = require("../dtos/create-service.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class BarbershopServiceController {
    constructor() {
        this.addService = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { barbershopId } = req.params;
                const createServiceDto = (0, class_transformer_1.plainToClass)(create_service_dto_1.CreateBarbershopServiceDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createServiceDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const result = yield this.barbershopServiceService.addService(Number(barbershopId), createServiceDto);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al agregar el servicio',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getServices = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { barbershopId } = req.params;
                const result = yield this.barbershopServiceService.getServices(Number(barbershopId));
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener los servicios',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.removeService = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { barbershopId, serviceId } = req.params;
                yield this.barbershopServiceService.removeService(Number(barbershopId), Number(serviceId));
                res.json({ message: 'Servicio eliminado exitosamente' });
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al eliminar el servicio',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.barbershopServiceService = new barbershop_service_service_1.BarbershopServiceService();
    }
}
exports.BarbershopServiceController = BarbershopServiceController;
//# sourceMappingURL=barbershop-service.controller.js.map