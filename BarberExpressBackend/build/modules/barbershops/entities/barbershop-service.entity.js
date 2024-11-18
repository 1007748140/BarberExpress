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
exports.BarbershopService = void 0;
const typeorm_1 = require("typeorm");
const barbershop_entity_1 = require("./barbershop.entity");
const bank_service_entity_1 = require("./bank-service.entity");
const service_duration_entity_1 = require("./service-duration.entity");
let BarbershopService = class BarbershopService {
};
exports.BarbershopService = BarbershopService;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BarbershopService.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barbershop_entity_1.Barbershop, barbershop => barbershop.services),
    (0, typeorm_1.JoinColumn)({ name: 'id_barbershop' }),
    __metadata("design:type", barbershop_entity_1.Barbershop)
], BarbershopService.prototype, "barbershop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bank_service_entity_1.BankService),
    (0, typeorm_1.JoinColumn)({ name: 'id_service' }),
    __metadata("design:type", bank_service_entity_1.BankService)
], BarbershopService.prototype, "service", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => service_duration_entity_1.ServiceDuration),
    (0, typeorm_1.JoinColumn)({ name: 'id_duration' }),
    __metadata("design:type", service_duration_entity_1.ServiceDuration)
], BarbershopService.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], BarbershopService.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], BarbershopService.prototype, "updatedAt", void 0);
exports.BarbershopService = BarbershopService = __decorate([
    (0, typeorm_1.Entity)('barbershop_services')
], BarbershopService);
//# sourceMappingURL=barbershop-service.entity.js.map