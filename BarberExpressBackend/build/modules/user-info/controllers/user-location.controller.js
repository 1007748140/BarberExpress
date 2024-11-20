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
exports.UserLocationController = void 0;
const user_location_service_1 = require("../services/user-location.service");
const create_user_location_dto_1 = require("../dtos/create-user-location.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class UserLocationController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const createLocationDto = (0, class_transformer_1.plainToClass)(create_user_location_dto_1.CreateUserLocationDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createLocationDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const result = yield this.userLocationService.create(req.user.id, createLocationDto);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al crear la ubicación',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getUserLocation = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const result = yield this.userLocationService.getUserLocation(req.user.id);
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener la ubicación',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getCountries = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.userLocationService.getCountries();
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener los países',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getDepartments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { countryId } = req.params;
                const result = yield this.userLocationService.getDepartments(Number(countryId));
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener los departamentos',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.userLocationService = new user_location_service_1.UserLocationService();
    }
}
exports.UserLocationController = UserLocationController;
//# sourceMappingURL=user-location.controller.js.map