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
exports.BarbershopServiceService = void 0;
const database_1 = require("../../../config/database");
const barbershop_service_entity_1 = require("../entities/barbershop-service.entity");
const barbershop_entity_1 = require("../entities/barbershop.entity");
const bank_service_entity_1 = require("../entities/bank-service.entity");
const service_duration_entity_1 = require("../entities/service-duration.entity");
class BarbershopServiceService {
    constructor() {
        this.barbershopServiceRepository = database_1.AppDataSource.getRepository(barbershop_service_entity_1.BarbershopService);
        this.barbershopRepository = database_1.AppDataSource.getRepository(barbershop_entity_1.Barbershop);
        this.bankServiceRepository = database_1.AppDataSource.getRepository(bank_service_entity_1.BankService);
        this.durationRepository = database_1.AppDataSource.getRepository(service_duration_entity_1.ServiceDuration);
    }
    addService(barbershopId, createServiceDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const barbershop = yield this.barbershopRepository.findOne({
                where: { id: barbershopId }
            });
            if (!barbershop) {
                throw new Error('Barbería no encontrada');
            }
            const service = yield this.bankServiceRepository.findOne({
                where: { id: createServiceDto.serviceId }
            });
            if (!service) {
                throw new Error('Servicio no encontrado');
            }
            const duration = yield this.durationRepository.findOne({
                where: { id: createServiceDto.durationId }
            });
            if (!duration) {
                throw new Error('Duración no encontrada');
            }
            const barbershopService = this.barbershopServiceRepository.create({
                barbershop,
                service,
                duration
            });
            return yield this.barbershopServiceRepository.save(barbershopService);
        });
    }
    getServices(barbershopId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.barbershopServiceRepository.find({
                where: { barbershop: { id: barbershopId } },
                relations: ['service', 'duration']
            });
        });
    }
    removeService(barbershopId, serviceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.barbershopServiceRepository.delete({
                barbershop: { id: barbershopId },
                service: { id: serviceId }
            });
            if (result.affected === 0) {
                throw new Error('Servicio no encontrado en la barbería');
            }
        });
    }
}
exports.BarbershopServiceService = BarbershopServiceService;
//# sourceMappingURL=barbershop-service.service.js.map