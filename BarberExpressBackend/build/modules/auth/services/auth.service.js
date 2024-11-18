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
const user_entity_1 = require("../entities/user.entity");
const jwt_config_1 = require("../../../config/jwt.config");
const user_role_entity_1 = require("../entities/user-role.entity");
const role_entity_1 = require("../entities/role.entity");
const profile_entity_1 = require("../../profiles/entities/profile.entity");
const user_location_entity_1 = require("../../user-info/entities/user-location.entity");
const country_entity_1 = require("../../location/entities/country.entity");
const department_entity_1 = require("../../location/entities/department.entity");
const barber_status_entity_1 = require("../entities/barber-status.entity");
class AuthService {
    constructor() {
        this.userRepository = database_1.AppDataSource.getRepository(user_entity_1.User);
        this.roleRepository = database_1.AppDataSource.getRepository(role_entity_1.Role);
        this.barberStatusRepository = database_1.AppDataSource.getRepository(barber_status_entity_1.BarberStatus);
        this.countryRepository = database_1.AppDataSource.getRepository(country_entity_1.Country);
        this.departmentRepository = database_1.AppDataSource.getRepository(department_entity_1.Department);
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({
                    where: { email },
                    relations: ['userRoles', 'userRoles.role', 'barberState']
                });
                if (!user) {
                    throw new Error('Usuario no encontrado');
                }
                const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error('Contraseña inválida');
                }
                const roles = user.userRoles.map(userRole => userRole.role.name);
                const token = (0, jwt_config_1.generateToken)(user.id, user.email, roles);
                return {
                    success: true,
                    token,
                    user: {
                        id: user.id,
                        email: user.email,
                        roles: roles,
                        barber_state: user.barberState,
                        created_at: user.created_at,
                        updated_at: user.updated_at
                    }
                };
            }
            catch (error) {
                throw new Error(error instanceof Error ? error.message : 'Error en el proceso de login');
            }
        });
    }
    register(registerDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const queryRunner = database_1.AppDataSource.createQueryRunner();
            yield queryRunner.connect();
            yield queryRunner.startTransaction();
            try {
                const existingUser = yield this.userRepository.findOne({
                    where: { email: registerDto.email }
                });
                if (existingUser) {
                    throw new Error('El email ya está registrado');
                }
                if (!['Cliente', 'Barbero', 'AdminBarberia'].includes(registerDto.role)) {
                    throw new Error('Rol no válido');
                }
                let barberStateId;
                switch (registerDto.role) {
                    case 'Barbero':
                        barberStateId = 1;
                        break;
                    case 'AdminBarberia':
                        barberStateId = 3;
                        break;
                    default:
                        barberStateId = 3;
                }
                const barberState = yield this.barberStatusRepository.findOne({
                    where: { id: barberStateId }
                });
                if (!barberState) {
                    throw new Error('Estado de barbero no encontrado');
                }
                const role = yield this.roleRepository.findOne({
                    where: { name: registerDto.role }
                });
                if (!role) {
                    throw new Error('Rol no encontrado');
                }
                const country = yield this.countryRepository.findOne({
                    where: { id: registerDto.countryId }
                });
                if (!country) {
                    throw new Error('País no encontrado');
                }
                const department = yield this.departmentRepository.findOne({
                    where: { id: registerDto.departmentId }
                });
                if (!department) {
                    throw new Error('Departamento no encontrado');
                }
                const hashedPassword = yield bcrypt_1.default.hash(registerDto.password, 10);
                const user = this.userRepository.create({
                    email: registerDto.email,
                    password: hashedPassword,
                    barberState: barberState
                });
                const savedUser = yield queryRunner.manager.save(user);
                const userRole = queryRunner.manager.create(user_role_entity_1.UserRole, {
                    user: savedUser,
                    role: role
                });
                yield queryRunner.manager.save(userRole);
                const profile = queryRunner.manager.create(profile_entity_1.Profile, {
                    user: savedUser,
                    firstName: registerDto.firstName,
                    lastName: registerDto.lastName,
                    phone: registerDto.phone,
                    profileImage: registerDto.profileImage
                });
                yield queryRunner.manager.save(profile);
                const location = queryRunner.manager.create(user_location_entity_1.UserLocation, {
                    user: savedUser,
                    country: country,
                    department: department,
                    latitude: registerDto.latitude,
                    longitude: registerDto.longitude
                });
                yield queryRunner.manager.save(location);
                yield queryRunner.commitTransaction();
                const token = (0, jwt_config_1.generateToken)(savedUser.id, savedUser.email, [role.name]);
                return {
                    success: true,
                    token,
                    user: {
                        id: savedUser.id,
                        email: savedUser.email,
                        roles: [role.name],
                        barber_state: savedUser.barberState,
                        created_at: savedUser.created_at,
                        updated_at: savedUser.updated_at
                    }
                };
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
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map