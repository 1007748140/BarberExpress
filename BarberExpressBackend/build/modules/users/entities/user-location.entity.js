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
exports.UserLocation = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const country_entity_1 = require("./country.entity");
const department_entity_1 = require("./department.entity");
let UserLocation = class UserLocation {
};
exports.UserLocation = UserLocation;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserLocation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'id_user' }),
    __metadata("design:type", user_entity_1.User)
], UserLocation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => country_entity_1.Country),
    (0, typeorm_1.JoinColumn)({ name: 'id_country' }),
    __metadata("design:type", country_entity_1.Country)
], UserLocation.prototype, "country", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => department_entity_1.Department),
    (0, typeorm_1.JoinColumn)({ name: 'id_department' }),
    __metadata("design:type", department_entity_1.Department)
], UserLocation.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 7 }),
    __metadata("design:type", Number)
], UserLocation.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 7 }),
    __metadata("design:type", Number)
], UserLocation.prototype, "longitude", void 0);
exports.UserLocation = UserLocation = __decorate([
    (0, typeorm_1.Entity)('users_location')
], UserLocation);
//# sourceMappingURL=user-location.entity.js.map