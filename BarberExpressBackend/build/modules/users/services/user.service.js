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
const people_entity_1 = require("../entities/people.entity");
const people_info_entity_1 = require("../entities/people-info.entity");
const people_location_entity_1 = require("../entities/people-location.entity");
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserService {
    constructor() {
        this.peopleRepository = database_1.AppDataSource.getRepository(people_entity_1.People);
        this.peopleInfoRepository = database_1.AppDataSource.getRepository(people_info_entity_1.PeopleInfo);
        this.peopleLocationRepository = database_1.AppDataSource.getRepository(people_location_entity_1.PeopleLocation);
    }
    createUser(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = database_1.AppDataSource.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                const existingUser = yield this.peopleInfoRepository.findOne({
                    where: { email: userData.email }
                });
                if (existingUser) {
                    throw new Error('Email already exists');
                }
                const hashedPassword = yield bcrypt_1.default.hash(userData.password, 10);
                const people = this.peopleRepository.create({
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                });
                yield queryRunner.manager.save(people);
                const location = this.peopleLocationRepository.create({
                    people: people,
                    country_id: userData.country_id,
                    state_id: userData.state_id,
                    latitude: userData.latitude,
                    longitude: userData.longitude,
                });
                yield queryRunner.manager.save(location);
                const info = this.peopleInfoRepository.create({
                    people: people,
                    email: userData.email,
                    password: hashedPassword,
                    phone: userData.phone,
                    role_id: userData.role_id,
                    location_id: location.id,
                });
                yield queryRunner.manager.save(info);
                yield queryRunner.commitTransaction();
                return { id: people.id, email: info.email };
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