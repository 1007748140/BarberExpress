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
exports.CreateServiceDto = void 0;
const class_validator_1 = require("class-validator");
class CreateServiceDto {
}
exports.CreateServiceDto = CreateServiceDto;
__decorate([
    (0, class_validator_1.IsString)({
        message: 'El nombre debe ser una cadena de texto'
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'El nombre es requerido'
    }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({
        message: 'La descripción debe ser una cadena de texto'
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'La descripción es requerida'
    }),
    __metadata("design:type", String)
], CreateServiceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, {
        message: 'El precio debe ser un número'
    }),
    (0, class_validator_1.Min)(0, {
        message: 'El precio no puede ser negativo'
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'El precio es requerido'
    }),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, {
        message: 'El ID de la barbería debe ser un número'
    }),
    (0, class_validator_1.IsNotEmpty)({
        message: 'El ID de la barbería es requerido'
    }),
    __metadata("design:type", Number)
], CreateServiceDto.prototype, "id_barbershop", void 0);
//# sourceMappingURL=create-service.dto.js.map