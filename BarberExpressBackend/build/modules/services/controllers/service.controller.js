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
exports.ServiceController = void 0;
const service_service_1 = require("../services/service.service");
const create_service_dto_1 = require("../dtos/create-service.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ServiceController {
    constructor() {
        this.createService = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createServiceDto = (0, class_transformer_1.plainToClass)(create_service_dto_1.CreateServiceDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createServiceDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const userId = req.user.id;
                const service = yield this.serviceService.createService(createServiceDto, userId);
                res.status(201).json(service);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        this.getServicesByBarbershop = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const barbershopId = parseInt(req.params.barbershopId);
                const services = yield this.serviceService.getServicesByBarbershop(barbershopId);
                res.json(services);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        this.serviceService = new service_service_1.ServiceService();
    }
}
exports.ServiceController = ServiceController;
//# sourceMappingURL=service.controller.js.map