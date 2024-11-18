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
exports.BarbershopBarber = void 0;
const typeorm_1 = require("typeorm");
const barbershop_entity_1 = require("./barbershop.entity");
const user_entity_1 = require("../../auth/entities/user.entity");
let BarbershopBarber = class BarbershopBarber {
};
exports.BarbershopBarber = BarbershopBarber;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BarbershopBarber.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barbershop_entity_1.Barbershop, barbershop => barbershop.barbers),
    (0, typeorm_1.JoinColumn)({ name: 'id_barbershop' }),
    __metadata("design:type", barbershop_entity_1.Barbershop)
], BarbershopBarber.prototype, "barbershop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'id_user' }),
    __metadata("design:type", user_entity_1.User)
], BarbershopBarber.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], BarbershopBarber.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], BarbershopBarber.prototype, "updatedAt", void 0);
exports.BarbershopBarber = BarbershopBarber = __decorate([
    (0, typeorm_1.Entity)('barbershop_barbers')
], BarbershopBarber);
//# sourceMappingURL=barbershop-barber.entity.js.map