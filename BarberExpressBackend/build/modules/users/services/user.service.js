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
const SALT_ROUNDS = 10;
const DEFAULT_ROLE_ID = 1;
class UserService {
    constructor() {
        this.peopleRepository = database_1.AppDataSource.getRepository(people_entity_1.People);
        this.peopleInfoRepository = database_1.AppDataSource.getRepository(people_info_entity_1.PeopleInfo);
        this.peopleLocationRepository = database_1.AppDataSource.getRepository(people_location_entity_1.PeopleLocation);
    }
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = database_1.AppDataSource.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                const existingUser = yield this.peopleInfoRepository.findOne({
                    where: { email: createUserDto.email }
                });
                if (existingUser) {
                    throw new Error('Email already exists');
                }
                const hashedPassword = yield bcrypt_1.default.hash(createUserDto.password, SALT_ROUNDS);
                const people = this.peopleRepository.create({
                    first_name: createUserDto.first_name,
                    last_name: createUserDto.last_name,
                });
                yield queryRunner.manager.save(people);
                const location = this.peopleLocationRepository.create({
                    people,
                    country_id: createUserDto.country_id,
                    state_id: createUserDto.state_id,
                    latitude: createUserDto.latitude,
                    longitude: createUserDto.longitude,
                });
                yield queryRunner.manager.save(location);
                const info = this.peopleInfoRepository.create({
                    people,
                    email: createUserDto.email,
                    password: hashedPassword,
                    phone: createUserDto.phone,
                    role_id: DEFAULT_ROLE_ID,
                    location_id: location.id,
                });
                yield queryRunner.manager.save(info);
                yield queryRunner.commitTransaction();
                return this.findOne(people.id);
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                if (error.message === 'Email already exists') {
                    throw new Error('A user with this email already exists.');
                }
                throw new Error(`Error creating user: ${error.message}`);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
    findOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.peopleRepository.findOne({
                where: { id },
                relations: ['info', 'location'],
            });
        });
    }
    update(id, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = database_1.AppDataSource.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                const user = yield this.findOne(id);
                if (!user) {
                    throw new Error('User not found');
                }
                if (updateUserDto.first_name)
                    user.first_name = updateUserDto.first_name;
                if (updateUserDto.last_name)
                    user.last_name = updateUserDto.last_name;
                yield queryRunner.manager.save(user);
                if (updateUserDto.country_id || updateUserDto.state_id ||
                    updateUserDto.latitude || updateUserDto.longitude) {
                    const location = user.location;
                    if (updateUserDto.country_id)
                        location.country_id = updateUserDto.country_id;
                    if (updateUserDto.state_id)
                        location.state_id = updateUserDto.state_id;
                    if (updateUserDto.latitude)
                        location.latitude = updateUserDto.latitude;
                    if (updateUserDto.longitude)
                        location.longitude = updateUserDto.longitude;
                    yield queryRunner.manager.save(location);
                }
                if (updateUserDto.phone || updateUserDto.profile_image) {
                    const info = user.info;
                    if (updateUserDto.phone)
                        info.phone = updateUserDto.phone;
                    if (updateUserDto.profile_image)
                        info.profile_image = updateUserDto.profile_image;
                    yield queryRunner.manager.save(info);
                }
                yield queryRunner.commitTransaction();
                return this.findOne(id);
            }
            catch (error) {
                yield queryRunner.rollbackTransaction();
                throw new Error(`Error updating user: ${error.message}`);
            }
            finally {
                yield queryRunner.release();
            }
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map