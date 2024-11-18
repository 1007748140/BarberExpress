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
exports.AppointmentPaymentService = void 0;
const database_1 = require("../../../config/database");
const appointment_payment_entity_1 = require("../entities/appointment-payment.entity");
const payment_status_entity_1 = require("../entities/payment-status.entity");
const payment_gateway_entity_1 = require("../entities/payment-gateway.entity");
const commission_value_appointment_entity_1 = require("../entities/commission-value-appointment.entity");
const appointment_entity_1 = require("../entities/appointment.entity");
class AppointmentPaymentService {
    constructor() {
        this.paymentRepository = database_1.AppDataSource.getRepository(appointment_payment_entity_1.AppointmentPayment);
        this.appointmentRepository = database_1.AppDataSource.getRepository(appointment_entity_1.Appointment);
        this.paymentStatusRepository = database_1.AppDataSource.getRepository(payment_status_entity_1.PaymentStatus);
        this.paymentGatewayRepository = database_1.AppDataSource.getRepository(payment_gateway_entity_1.PaymentGateway);
        this.commissionRepository = database_1.AppDataSource.getRepository(commission_value_appointment_entity_1.CommissionValueAppointment);
    }
    createPayment(userId, createPaymentDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const appointment = yield this.appointmentRepository.findOne({
                where: { id: createPaymentDto.appointmentId },
                relations: ['barbershop', 'barber']
            });
            if (!appointment) {
                throw new Error('Cita no encontrada');
            }
            const paymentGateway = yield this.paymentGatewayRepository.findOne({
                where: { id: createPaymentDto.paymentGatewayId }
            });
            if (!paymentGateway) {
                throw new Error('Método de pago no encontrado');
            }
            const initialStatus = yield this.paymentStatusRepository.findOne({
                where: { status: 'Pendiente' }
            });
            if (!initialStatus) {
                throw new Error('Estado de pago no encontrado');
            }
            const commission = yield this.commissionRepository.findOne({
                where: { id: 1 }
            });
            if (!commission) {
                throw new Error('Valor de comisión no encontrado');
            }
            const commissionAmount = (createPaymentDto.total * commission.value) / 100;
            const totalReceiveBarbershop = createPaymentDto.total - commissionAmount;
            const payment = this.paymentRepository.create({
                user: { id: userId },
                barbershop: appointment.barbershop,
                barber: appointment.barber,
                appointment,
                paymentGateway,
                paymentStatus: initialStatus,
                total: createPaymentDto.total,
                totalReceiveBarbershop,
                commission
            });
            return yield this.paymentRepository.save(payment);
        });
    }
    getPaymentDetails(paymentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const payment = yield this.paymentRepository.findOne({
                where: { id: paymentId },
                relations: ['user', 'barbershop', 'barber', 'appointment', 'paymentGateway', 'paymentStatus']
            });
            if (!payment) {
                throw new Error('Pago no encontrado');
            }
            return payment;
        });
    }
    getUserPayments(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.paymentRepository.find({
                where: { user: { id: userId } },
                relations: ['barbershop', 'appointment', 'paymentStatus'],
                order: { createdAt: 'DESC' }
            });
        });
    }
}
exports.AppointmentPaymentService = AppointmentPaymentService;
//# sourceMappingURL=appointment-payment.service.js.map