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
exports.UserLocationService = void 0;
const database_1 = require("../../../config/database");
const user_location_entity_1 = require("../entities/user-location.entity");
const country_entity_1 = require("../entities/country.entity");
const department_entity_1 = require("../entities/department.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
class UserLocationService {
    constructor() {
        this.locationRepository = database_1.AppDataSource.getRepository(user_location_entity_1.UserLocation);
        this.countryRepository = database_1.AppDataSource.getRepository(country_entity_1.Country);
        this.departmentRepository = database_1.AppDataSource.getRepository(department_entity_1.Department);
        this.userRepository = database_1.AppDataSource.getRepository(user_entity_1.User);
    }
    create(userId, createLocationDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({
                where: { id: userId }
            });
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            const country = yield this.countryRepository.findOne({
                where: { id: createLocationDto.countryId }
            });
            if (!country) {
                throw new Error('País no encontrado');
            }
            const department = yield this.departmentRepository.findOne({
                where: { id: createLocationDto.departmentId }
            });
            if (!department) {
                throw new Error('Departamento no encontrado');
            }
            const existingLocation = yield this.locationRepository.findOne({
                where: { user: { id: userId } }
            });
            if (existingLocation) {
                existingLocation.country = country;
                existingLocation.department = department;
                existingLocation.latitude = createLocationDto.latitude;
                existingLocation.longitude = createLocationDto.longitude;
                return yield this.locationRepository.save(existingLocation);
            }
            const location = this.locationRepository.create({
                user,
                country,
                department,
                latitude: createLocationDto.latitude,
                longitude: createLocationDto.longitude
            });
            return yield this.locationRepository.save(location);
        });
    }
    getUserLocation(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const location = yield this.locationRepository.findOne({
                where: { user: { id: userId } },
                relations: ['country', 'department']
            });
            if (!location) {
                throw new Error('Ubicación no encontrada');
            }
            return location;
        });
    }
    getCountries() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.countryRepository.find({
                order: { name: 'ASC' }
            });
        });
    }
    getDepartments(countryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.departmentRepository.find({
                where: { country: { id: countryId } },
                order: { name: 'ASC' }
            });
        });
    }
}
exports.UserLocationService = UserLocationService;
//# sourceMappingURL=user-location.service.js.map