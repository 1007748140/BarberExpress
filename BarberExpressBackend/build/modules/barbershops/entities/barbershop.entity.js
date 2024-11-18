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
exports.Barbershop = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../auth/entities/user.entity");
const state_barbershop_entity_1 = require("./state-barbershop.entity");
const barbershop_service_entity_1 = require("./barbershop-service.entity");
const barbershop_barber_entity_1 = require("./barbershop-barber.entity");
const barbershop_schedule_entity_1 = require("./barbershop-schedule.entity");
const barbershop_product_entity_1 = require("./barbershop-product.entity");
let Barbershop = class Barbershop {
};
exports.Barbershop = Barbershop;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Barbershop.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'id_user' }),
    __metadata("design:type", user_entity_1.User)
], Barbershop.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => state_barbershop_entity_1.StateBarbershop),
    (0, typeorm_1.JoinColumn)({ name: 'id_state_barbershops' }),
    __metadata("design:type", state_barbershop_entity_1.StateBarbershop)
], Barbershop.prototype, "state", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Barbershop.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Barbershop.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'image_banner' }),
    __metadata("design:type", String)
], Barbershop.prototype, "imageBanner", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => barbershop_service_entity_1.BarbershopService, service => service.barbershop),
    __metadata("design:type", Array)
], Barbershop.prototype, "services", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => barbershop_barber_entity_1.BarbershopBarber, barber => barber.barbershop),
    __metadata("design:type", Array)
], Barbershop.prototype, "barbers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => barbershop_schedule_entity_1.BarbershopSchedule, schedule => schedule.barbershop),
    __metadata("design:type", Array)
], Barbershop.prototype, "schedules", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => barbershop_product_entity_1.BarbershopProduct, product => product.barbershop),
    __metadata("design:type", Array)
], Barbershop.prototype, "products", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], Barbershop.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], Barbershop.prototype, "updatedAt", void 0);
exports.Barbershop = Barbershop = __decorate([
    (0, typeorm_1.Entity)('barbershops')
], Barbershop);
//# sourceMappingURL=barbershop.entity.js.map