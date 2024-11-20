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
const auth_service_1 = require("./auth.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_config_1 = require("../../../config/jwt.config");
jest.mock('bcrypt', () => ({
    compare: jest.fn()
}));
jest.mock('../../../config/jwt.config', () => ({
    generateToken: jest.fn()
}));
const mockUserRepository = {
    findOne: jest.fn()
};
jest.mock('../../../config/database', () => ({
    AppDataSource: {
        getRepository: jest.fn(() => mockUserRepository)
    }
}));
describe('AuthService', () => {
    let authService;
    const mockEmail = 'test@test.com';
    const mockPassword = 'password123';
    beforeEach(() => {
        authService = new auth_service_1.AuthService();
    });
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('login', () => {
        const mockUser = {
            id: 1,
            email: mockEmail,
            password: 'hashedPassword',
            first_name: 'Test',
            last_name: 'User',
            role: {
                name: 'barber'
            }
        };
        const mockToken = 'mockToken123';
        it('debería realizar login exitoso con credenciales válidas', () => __awaiter(void 0, void 0, void 0, function* () {
            mockUserRepository.findOne.mockResolvedValue(mockUser);
            bcrypt_1.default.compare.mockResolvedValue(true);
            jwt_config_1.generateToken.mockReturnValue(mockToken);
            const result = yield authService.login(mockEmail, mockPassword);
            expect(mockUserRepository.findOne).toHaveBeenCalledWith({
                where: { email: mockEmail },
                relations: ['role']
            });
            expect(bcrypt_1.default.compare).toHaveBeenCalledWith(mockPassword, mockUser.password);
            expect(jwt_config_1.generateToken).toHaveBeenCalledWith(mockUser.id, mockUser.email, mockUser.role.name);
            expect(result).toEqual({
                token: mockToken,
                user: {
                    id: mockUser.id,
                    email: mockUser.email,
                    firstName: mockUser.first_name,
                    lastName: mockUser.last_name,
                    role: mockUser.role.name
                }
            });
        }));
        it('debería lanzar error si el usuario no existe', () => __awaiter(void 0, void 0, void 0, function* () {
            mockUserRepository.findOne.mockResolvedValue(null);
            yield expect(authService.login(mockEmail, mockPassword))
                .rejects
                .toThrow('User not found');
            expect(bcrypt_1.default.compare).not.toHaveBeenCalled();
            expect(jwt_config_1.generateToken).not.toHaveBeenCalled();
        }));
        it('debería lanzar error si la contraseña es inválida', () => __awaiter(void 0, void 0, void 0, function* () {
            mockUserRepository.findOne.mockResolvedValue(mockUser);
            bcrypt_1.default.compare.mockResolvedValue(false);
            yield expect(authService.login(mockEmail, mockPassword))
                .rejects
                .toThrow('Invalid password');
            expect(jwt_config_1.generateToken).not.toHaveBeenCalled();
        }));
        it('debería manejar errores de base de datos', () => __awaiter(void 0, void 0, void 0, function* () {
            const dbError = new Error('Database connection failed');
            mockUserRepository.findOne.mockRejectedValue(dbError);
            yield expect(authService.login(mockEmail, mockPassword))
                .rejects
                .toThrow(dbError);
        }));
    });
});
//# sourceMappingURL=auth.service.test.js.map