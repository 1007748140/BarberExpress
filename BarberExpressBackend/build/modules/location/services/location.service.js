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
exports.LocationService = void 0;
const database_1 = require("../../../config/database");
const country_entity_1 = require("../entities/country.entity");
const department_entity_1 = require("../entities/department.entity");
class LocationService {
    constructor() {
        this.countryRepository = database_1.AppDataSource.getRepository(country_entity_1.Country);
        this.departmentRepository = database_1.AppDataSource.getRepository(department_entity_1.Department);
    }
    getLocationData() {
        return __awaiter(this, void 0, void 0, function* () {
            const [countries, departments] = yield Promise.all([
                this.countryRepository.find(),
                this.departmentRepository.find()
            ]);
            return {
                countries,
                departments
            };
        });
    }
}
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map