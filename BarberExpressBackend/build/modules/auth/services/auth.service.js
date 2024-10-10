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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = require("../../../config/database");
const people_info_entity_1 = require("../../users/entities/people-info.entity");
const jwt_config_1 = require("../../../config/jwt.config");
class AuthService {
    constructor() {
        this.peopleInfoRepository = database_1.AppDataSource.getRepository(people_info_entity_1.PeopleInfo);
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield this.peopleInfoRepository.findOne({
                where: { email },
                relations: ['people']
            });
            if (!userInfo) {
                throw new Error('User not found');
            }
            const isPasswordValid = yield bcrypt_1.default.compare(password, userInfo.password);
            if (!isPasswordValid) {
                throw new Error('Invalid password');
            }
            const token = (0, jwt_config_1.generateToken)(userInfo.people.id, userInfo.email);
            return {
                token,
                user: {
                    id: userInfo.people.id,
                    email: userInfo.email,
                    firstName: userInfo.people.first_name,
                    lastName: userInfo.people.last_name
                }
            };
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map