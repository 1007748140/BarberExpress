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
const state_barbershop_entity_1 = require("../entities/state-barbershop.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
class BarbershopService {
    constructor() {
        this.barbershopRepository = database_1.AppDataSource.getRepository(barbershop_entity_1.Barbershop);
        this.stateRepository = database_1.AppDataSource.getRepository(state_barbershop_entity_1.StateBarbershop);
        this.userRepository = database_1.AppDataSource.getRepository(user_entity_1.User);
    }
    create(createBarbershopDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: createBarbershopDto.userId }
            });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const initialState = yield this.stateRepository.findOne({
                where: { id: 2 }
            });
            if (!initialState) {
                throw new Error('Estado inicial no encontrado');
            }
            const barbershop = this.barbershopRepository.create({
                user,
                state: initialState,
                name: createBarbershopDto.name,
                description: createBarbershopDto.description,
                imageBanner: createBarbershopDto.imageBanner
            });
            return yield this.barbershopRepository.save(barbershop);
        });
    }
    update(id, updateBarbershopDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const barbershop = yield this.barbershopRepository.findOne({
                where: { id }
            });
            if (!barbershop) {
                throw new Error('Barbería no encontrada');
            }
            if (updateBarbershopDto.stateId) {
                const newState = yield this.stateRepository.findOne({
                    where: { id: updateBarbershopDto.stateId }
                });
                if (newState) {
                    barbershop.state = newState;
                }
            }
            Object.assign(barbershop, updateBarbershopDto);
            return yield this.barbershopRepository.save(barbershop);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const barbershop = yield this.barbershopRepository.findOne({
                where: { id },
                relations: ['state', 'services', 'barbers', 'schedules', 'products']
            });
            if (!barbershop) {
                throw new Error('Barbería no encontrada');
            }
            return barbershop;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.barbershopRepository.find({
                relations: ['state', 'services', 'barbers']
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.barbershopRepository.delete(id);
            if (result.affected === 0) {
                throw new Error('Barbería no encontrada');
            }
        });
    }
}
exports.BarbershopService = BarbershopService;
//# sourceMappingURL=barbershop.service.js.map