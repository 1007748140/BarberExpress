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
exports.StateService = void 0;
const database_1 = require("../../../config/database");
const state_entity_1 = require("../entities/state.entity");
class StateService {
    constructor() {
        this.stateRepository = database_1.AppDataSource.getRepository(state_entity_1.State);
    }
    getStatesByCountry(countryId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.stateRepository.find({
                where: { country_id: countryId },
            });
        });
    }
}
exports.StateService = StateService;
//# sourceMappingURL=state.service.js.map