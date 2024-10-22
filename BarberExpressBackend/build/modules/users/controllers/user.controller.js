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
exports.UserController = void 0;
const user_service_1 = require("../services/user.service");
const create_user_dto_1 = require("../dtos/create-user.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UserController {
    constructor() {
        this.registerUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const userData = (0, class_transformer_1.plainToClass)(create_user_dto_1.CreateUserDto, {
                    firstName: req.body.firstName || req.body.first_name,
                    lastName: req.body.lastName || req.body.last_name,
                    email: req.body.email,
                    password: req.body.password,
                    phone: req.body.phone,
                    idRole: req.body.idRole || req.body.id_role,
                    idCountry: req.body.idCountry || req.body.id_country,
                    idDepartment: req.body.idDepartment || req.body.id_department,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude
                });
                const errors = yield (0, class_validator_1.validate)(userData);
                if (errors.length > 0) {
                    return res.status(400).json({
                        success: false,
                        message: 'Validation failed',
                        errors: errors.map(error => ({
                            property: error.property,
                            constraints: error.constraints
                        }))
                    });
                }
                const newUser = yield this.userService.createUser(userData);
                return res.status(201).json({
                    success: true,
                    message: 'User created successfully',
                    data: newUser
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    if (error.message === 'Email already exists') {
                        return res.status(409).json({
                            success: false,
                            message: 'Email already exists'
                        });
                    }
                    return res.status(400).json({
                        success: false,
                        message: error.message
                    });
                }
                return res.status(500).json({
                    success: false,
                    message: 'Internal server error'
                });
            }
        });
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map