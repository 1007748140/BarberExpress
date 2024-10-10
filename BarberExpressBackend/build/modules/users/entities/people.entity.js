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
exports.People = void 0;
const typeorm_1 = require("typeorm");
const people_info_entity_1 = require("./people-info.entity");
const people_location_entity_1 = require("./people-location.entity");
let People = class People {
};
exports.People = People;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], People.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], People.prototype, "first_name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], People.prototype, "last_name", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => people_info_entity_1.PeopleInfo, info => info.people),
    __metadata("design:type", people_info_entity_1.PeopleInfo)
], People.prototype, "info", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => people_location_entity_1.PeopleLocation, location => location.people),
    __metadata("design:type", people_location_entity_1.PeopleLocation)
], People.prototype, "location", void 0);
exports.People = People = __decorate([
    (0, typeorm_1.Entity)('people')
], People);
//# sourceMappingURL=people.entity.js.map