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
exports.AppointmentPaymentController = void 0;
const appointment_payment_service_1 = require("../services/appointment-payment.service");
const create_payment_dto_1 = require("../dtos/create-payment.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class AppointmentPaymentController {
    constructor() {
        this.createPayment = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const createPaymentDto = (0, class_transformer_1.plainToClass)(create_payment_dto_1.CreatePaymentDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createPaymentDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const result = yield this.appointmentPaymentService.createPayment(req.user.id, createPaymentDto);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al procesar el pago',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getPaymentDetails = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { paymentId } = req.params;
                const result = yield this.appointmentPaymentService.getPaymentDetails(Number(paymentId));
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener los detalles del pago',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getUserPayments = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!((_a = req.user) === null || _a === void 0 ? void 0 : _a.id)) {
                    res.status(401).json({ message: 'Usuario no autenticado' });
                    return;
                }
                const result = yield this.appointmentPaymentService.getUserPayments(req.user.id);
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener los pagos del usuario',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.appointmentPaymentService = new appointment_payment_service_1.AppointmentPaymentService();
    }
}
exports.AppointmentPaymentController = AppointmentPaymentController;
//# sourceMappingURL=appointment-payment.controller.js.map