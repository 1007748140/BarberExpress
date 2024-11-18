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
exports.CreateProductPaymentDto = void 0;
const class_validator_1 = require("class-validator");
class CreateProductPaymentDto {
}
exports.CreateProductPaymentDto = CreateProductPaymentDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El ID del producto es requerido' }),
    __metadata("design:type", Number)
], CreateProductPaymentDto.prototype, "productId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'La cantidad es requerida' }),
    (0, class_validator_1.Min)(1, { message: 'La cantidad debe ser al menos 1' }),
    __metadata("design:type", Number)
], CreateProductPaymentDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'El método de pago es requerido' }),
    __metadata("design:type", Number)
], CreateProductPaymentDto.prototype, "paymentGatewayId", void 0);
//# sourceMappingURL=create-payment.dto.js.map