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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'First name is required' }),
    (0, class_validator_1.IsString)({ message: 'First name must be a string' }),
    (0, class_validator_1.MinLength)(2, { message: 'First name must be at least 2 characters long' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Last name is required' }),
    (0, class_validator_1.IsString)({ message: 'El apellido debe ser una cadena' }),
    (0, class_validator_1.MinLength)(2, { message: 'El apellido debe tener al menos 2 caracteres.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Se requiere correo electrónico' }),
    (0, class_validator_1.IsEmail)({}, { message: 'Formato de correo electrónico no válido' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Password is required' }),
    (0, class_validator_1.MinLength)(8, { message: 'La contraseña debe tener al menos 8 caracteres.' }),
    (0, class_validator_1.Matches)(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, { message: 'La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y un carácter especial' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Phone is required' }),
    (0, class_validator_1.Matches)(/^\+?[1-9]\d{1,10}$/, { message: 'Invalid phone number format' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Role ID is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Role ID must be a number' }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "idRole", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Country ID is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Country ID must be a number' }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "idCountry", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Department ID is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Department ID must be a number' }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "idDepartment", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Latitude is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Latitude must be a number' }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "latitude", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Longitude is required' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Longitude must be a number' }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "longitude", void 0);
//# sourceMappingURL=create-user.dto.js.map