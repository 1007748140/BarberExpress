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
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
const login_dto_1 = require("../dtos/login.dto");
const register_dto_1 = require("../dtos/register.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AuthController {
    constructor() {
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const loginDto = (0, class_transformer_1.plainToClass)(login_dto_1.LoginDto, req.body);
                const errors = yield (0, class_validator_1.validate)(loginDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const result = yield this.authService.login(loginDto.email, loginDto.password);
                res.json(result);
            }
            catch (error) {
                console.error('Login error:', error);
                res.status(401).json({
                    success: false,
                    message: error.message
                });
            }
        });
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('Received registration request:', req.body);
                const registerDto = (0, class_transformer_1.plainToClass)(register_dto_1.RegisterDto, req.body);
                const errors = yield (0, class_validator_1.validate)(registerDto);
                if (errors.length > 0) {
                    console.log('Validation errors:', errors);
                    res.status(400).json({
                        success: false,
                        errors: errors.map(error => ({
                            property: error.property,
                            constraints: error.constraints
                        }))
                    });
                    return;
                }
                const result = yield this.authService.register(registerDto);
                res.status(201).json(result);
            }
            catch (error) {
                console.error('Registration error:', error);
                res.status(500).json({
                    success: false,
                    message: error instanceof Error ? error.message : 'Error al registrar usuario'
                });
            }
        });
        this.authService = new auth_service_1.AuthService();
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map