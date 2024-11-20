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
exports.ServiceService = void 0;
const database_1 = require("../../../config/database");
const service_entity_1 = require("../entities/service.entity");
const barbershop_entity_1 = require("../../barbers/entities/barbershop.entity");
class ServiceService {
    constructor() {
        this.serviceRepository = database_1.AppDataSource.getRepository(service_entity_1.Service);
        this.barbershopRepository = database_1.AppDataSource.getRepository(barbershop_entity_1.Barbershop);
    }
    createService(createServiceDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const barbershop = yield this.barbershopRepository.findOne({
                where: {
                    id: createServiceDto.id_barbershop,
                    user: { id: userId }
                },
                relations: ['user']
            });
            if (!barbershop) {
                throw new Error('No tienes permiso para crear servicios en esta barbería');
            }
            const service = this.serviceRepository.create(Object.assign(Object.assign({}, createServiceDto), { barbershop }));
            return yield this.serviceRepository.save(service);
        });
    }
    getServicesByBarbershop(barbershopId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.serviceRepository.find({
                where: { barbershop: { id: barbershopId } }
            });
        });
    }
}
exports.ServiceService = ServiceService;
//# sourceMappingURL=service.service.js.map