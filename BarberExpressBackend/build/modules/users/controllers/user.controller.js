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
                const userData = (0, class_transformer_1.plainToClass)(create_user_dto_1.CreateUserDto, req.body);
                const errors = yield (0, class_validator_1.validate)(userData);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const newUser = yield this.userService.createUser(userData);
                res.status(201).json(newUser);
            }
            catch (error) {
                res.status(400).json({ message: error.message });
            }
        });
        this.userService = new user_service_1.UserService();
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map