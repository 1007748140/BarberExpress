"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentPayment = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../auth/entities/user.entity");
const barbershop_entity_1 = require("../../barbershops/entities/barbershop.entity");
const barbershop_barber_entity_1 = require("../../barbershops/entities/barbershop-barber.entity");
const appointment_entity_1 = require("./appointment.entity");
const payment_gateway_entity_1 = require("./payment-gateway.entity");
const payment_status_entity_1 = require("./payment-status.entity");
const commission_value_appointment_entity_1 = require("./commission-value-appointment.entity");
let AppointmentPayment = class AppointmentPayment {
};
exports.AppointmentPayment = AppointmentPayment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], AppointmentPayment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'id_user' }),
    __metadata("design:type", user_entity_1.User)
], AppointmentPayment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barbershop_entity_1.Barbershop),
    (0, typeorm_1.JoinColumn)({ name: 'id_barbershop' }),
    __metadata("design:type", barbershop_entity_1.Barbershop)
], AppointmentPayment.prototype, "barbershop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barbershop_barber_entity_1.BarbershopBarber),
    (0, typeorm_1.JoinColumn)({ name: 'id_barbershop_barber' }),
    __metadata("design:type", barbershop_barber_entity_1.BarbershopBarber)
], AppointmentPayment.prototype, "barber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => appointment_entity_1.Appointment),
    (0, typeorm_1.JoinColumn)({ name: 'id_appointment' }),
    __metadata("design:type", appointment_entity_1.Appointment)
], AppointmentPayment.prototype, "appointment", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_gateway_entity_1.PaymentGateway),
    (0, typeorm_1.JoinColumn)({ name: 'id_payment_gateways' }),
    __metadata("design:type", payment_gateway_entity_1.PaymentGateway)
], AppointmentPayment.prototype, "paymentGateway", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_status_entity_1.PaymentStatus),
    (0, typeorm_1.JoinColumn)({ name: 'id_payment_status' }),
    __metadata("design:type", payment_status_entity_1.PaymentStatus)
], AppointmentPayment.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], AppointmentPayment.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, name: 'total_receive_barbershop' }),
    __metadata("design:type", Number)
], AppointmentPayment.prototype, "totalReceiveBarbershop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => commission_value_appointment_entity_1.CommissionValueAppointment),
    (0, typeorm_1.JoinColumn)({ name: 'id_commission_appointment' }),
    __metadata("design:type", commission_value_appointment_entity_1.CommissionValueAppointment)
], AppointmentPayment.prototype, "commission", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], AppointmentPayment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], AppointmentPayment.prototype, "updatedAt", void 0);
exports.AppointmentPayment = AppointmentPayment = __decorate([
    (0, typeorm_1.Entity)('appointment_payments')
], AppointmentPayment);
//# sourceMappingURL=appointment-payment.entity.js.map