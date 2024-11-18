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
exports.Appointment = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../auth/entities/user.entity");
const barbershop_entity_1 = require("../../barbershops/entities/barbershop.entity");
const barbershop_barber_entity_1 = require("../../barbershops/entities/barbershop-barber.entity");
const barbershop_service_entity_1 = require("../../barbershops/entities/barbershop-service.entity");
let Appointment = class Appointment {
};
exports.Appointment = Appointment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Appointment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'id_user' }),
    __metadata("design:type", user_entity_1.User)
], Appointment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barbershop_entity_1.Barbershop),
    (0, typeorm_1.JoinColumn)({ name: 'id_barbershop' }),
    __metadata("design:type", barbershop_entity_1.Barbershop)
], Appointment.prototype, "barbershop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barbershop_barber_entity_1.BarbershopBarber),
    (0, typeorm_1.JoinColumn)({ name: 'id_barber' }),
    __metadata("design:type", barbershop_barber_entity_1.BarbershopBarber)
], Appointment.prototype, "barber", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barbershop_service_entity_1.BarbershopService),
    (0, typeorm_1.JoinColumn)({ name: 'id_service' }),
    __metadata("design:type", barbershop_service_entity_1.BarbershopService)
], Appointment.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'appointment_date', type: 'date' }),
    __metadata("design:type", Date)
], Appointment.prototype, "appointmentDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'start_time', type: 'time' }),
    __metadata("design:type", String)
], Appointment.prototype, "startTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'end_time', type: 'time' }),
    __metadata("design:type", String)
], Appointment.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Appointment.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Appointment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Appointment.prototype, "updatedAt", void 0);
exports.Appointment = Appointment = __decorate([
    (0, typeorm_1.Entity)('appointments')
], Appointment);
//# sourceMappingURL=appointment.entity.js.map