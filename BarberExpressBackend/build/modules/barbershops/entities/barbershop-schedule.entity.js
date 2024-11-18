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
exports.BarbershopSchedule = void 0;
const typeorm_1 = require("typeorm");
const barbershop_entity_1 = require("./barbershop.entity");
const days_week_entity_1 = require("./days-week.entity");
const hours_entity_1 = require("./hours.entity");
let BarbershopSchedule = class BarbershopSchedule {
};
exports.BarbershopSchedule = BarbershopSchedule;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BarbershopSchedule.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barbershop_entity_1.Barbershop, barbershop => barbershop.schedules),
    (0, typeorm_1.JoinColumn)({ name: 'id_barbershop' }),
    __metadata("design:type", barbershop_entity_1.Barbershop)
], BarbershopSchedule.prototype, "barbershop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => days_week_entity_1.DaysWeek),
    (0, typeorm_1.JoinColumn)({ name: 'id_day' }),
    __metadata("design:type", days_week_entity_1.DaysWeek)
], BarbershopSchedule.prototype, "day", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hours_entity_1.Hours),
    (0, typeorm_1.JoinColumn)({ name: 'id_start_hour' }),
    __metadata("design:type", hours_entity_1.Hours)
], BarbershopSchedule.prototype, "startHour", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hours_entity_1.Hours),
    (0, typeorm_1.JoinColumn)({ name: 'id_end_hour' }),
    __metadata("design:type", hours_entity_1.Hours)
], BarbershopSchedule.prototype, "endHour", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], BarbershopSchedule.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], BarbershopSchedule.prototype, "updatedAt", void 0);
exports.BarbershopSchedule = BarbershopSchedule = __decorate([
    (0, typeorm_1.Entity)('schedules')
], BarbershopSchedule);
//# sourceMappingURL=barbershop-schedule.entity.js.map