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
exports.UserService = void 0;
const database_1 = require("../../../config/database");
const user_entity_1 = require("../entities/user.entity");
const user_location_entity_1 = require("../entities/user-location.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor() {
        this.userRepository = database_1.AppDataSource.getRepository(user_entity_1.User);
        this.userLocationRepository = database_1.AppDataSource.getRepository(user_location_entity_1.UserLocation);
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = database_1.AppDataSource.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                const existingUser = yield this.userRepository.findOne({
                    where: { email: userData.email }
                });
                if (existingUser) {
                    throw new Error('Email already exists');
                }
                const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
                const user = this.userRepository.create({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    email: userData.email,
                    password: hashedPassword,
                    phone: userData.phone,
                    role: { id: userData.idRole }
                });
                yield queryRunner.manager.save(user);
                const location = this.userLocationRepository.create({
                    user: user,
                    country: { id: userData.idCountry },
                    department: { id: userData.idDepartment },
                    latitude: userData.latitude,
                    longitude: userData.longitude,
                });
                yield queryRunner.manager.save(location);
                yield queryRunner.commitTransaction();
                return { id: user.id, email: user.email };
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw error;
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map