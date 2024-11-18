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
exports.BarbershopService = void 0;
const database_1 = require("../../../config/database");
const barbershop_entity_1 = require("../entities/barbershop.entity");
const user_location_entity_1 = require("../../users/entities/user-location.entity");
class BarbershopService {
    constructor() {
        this.barbershopRepository = database_1.AppDataSource.getRepository(barbershop_entity_1.Barbershop);
        this.locationRepository = database_1.AppDataSource.getRepository(user_location_entity_1.UserLocation);
    }
    createBarbershop(createBarbershopDto, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = yield this.locationRepository.findOne({
                where: { id: createBarbershopDto.id_location }
            });
            if (!location) {
                throw new Error('La ubicación especificada no existe');
            }
            const barbershop = this.barbershopRepository.create(Object.assign(Object.assign({}, createBarbershopDto), { user: { id: userId }, location }));
            return yield this.barbershopRepository.save(barbershop);
        });
    }
    getBarbershopById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const barbershop = yield this.barbershopRepository.findOne({
                where: { id },
                relations: ['user', 'location']
            });
            if (!barbershop) {
                throw new Error('Barbería no encontrada');
            }
            return barbershop;
        });
    }
    getBarbershopsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.barbershopRepository.find({
                where: { user: { id: userId } },
                relations: ['location']
            });
        });
    }
}
exports.BarbershopService = BarbershopService;
//# sourceMappingURL=barbershop.service.js.map