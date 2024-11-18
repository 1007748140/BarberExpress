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
exports.CreateUserLocationDto = void 0;
const class_validator_1 = require("class-validator");
class CreateUserLocationDto {
}
exports.CreateUserLocationDto = CreateUserLocationDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del país es requerido' }),
    __metadata("design:type", Number)
], CreateUserLocationDto.prototype, "countryId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del departamento es requerido' }),
    __metadata("design:type", Number)
], CreateUserLocationDto.prototype, "departmentId", void 0);
__decorate([
    (0, class_validator_1.IsDecimal)({ decimal_digits: '7' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La latitud es requerida' }),
    __metadata("design:type", Number)
], CreateUserLocationDto.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsDecimal)({ decimal_digits: '7' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'La longitud es requerida' }),
    __metadata("design:type", Number)
], CreateUserLocationDto.prototype, "longitude", void 0);
//# sourceMappingURL=create-user-location.dto.js.map