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
exports.AppointmentController = void 0;
const appointment_service_1 = require("../services/appointment.service");
const create_appointment_dto_1 = require("../dtos/create-appointment.dto");
const update_appointment_dto_1 = require("../dtos/update-appointment.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AppointmentController {
    constructor() {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const createAppointmentDto = (0, class_transformer_1.plainToClass)(create_appointment_dto_1.CreateAppointmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createAppointmentDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const result = yield this.appointmentService.create(req.user.id, createAppointmentDto);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al crear la cita',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const updateAppointmentDto = (0, class_transformer_1.plainToClass)(update_appointment_dto_1.UpdateAppointmentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updateAppointmentDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const result = yield this.appointmentService.update(Number(id), updateAppointmentDto);
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al actualizar la cita',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const result = yield this.appointmentService.getById(Number(id));
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener la cita',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getUserAppointments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const result = yield this.appointmentService.getUserAppointments(req.user.id);
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener las citas del usuario',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getBarberAppointments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { barberId } = req.params;
                const result = yield this.appointmentService.getBarberAppointments(Number(barberId));
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener las citas del barbero',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.appointmentService = new appointment_service_1.AppointmentService();
    }
}
exports.AppointmentController = AppointmentController;
//# sourceMappingURL=appointment.controller.js.map