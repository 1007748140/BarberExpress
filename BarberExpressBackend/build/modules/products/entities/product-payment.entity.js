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
exports.ProductPayment = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../auth/entities/user.entity");
const barbershop_entity_1 = require("../../barbershops/entities/barbershop.entity");
const barbershop_product_entity_1 = require("./barbershop-product.entity");
const payment_gateway_entity_1 = require("../../appointments/entities/payment-gateway.entity");
const payment_status_entity_1 = require("../../appointments/entities/payment-status.entity");
const commission_value_product_entity_1 = require("./commission-value-product.entity");
let ProductPayment = class ProductPayment {
};
exports.ProductPayment = ProductPayment;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProductPayment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, typeorm_1.JoinColumn)({ name: 'id_user' }),
    __metadata("design:type", user_entity_1.User)
], ProductPayment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barbershop_entity_1.Barbershop),
    (0, typeorm_1.JoinColumn)({ name: 'id_barbershop' }),
    __metadata("design:type", barbershop_entity_1.Barbershop)
], ProductPayment.prototype, "barbershop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barbershop_product_entity_1.BarbershopProduct),
    (0, typeorm_1.JoinColumn)({ name: 'id_product' }),
    __metadata("design:type", barbershop_product_entity_1.BarbershopProduct)
], ProductPayment.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_gateway_entity_1.PaymentGateway),
    (0, typeorm_1.JoinColumn)({ name: 'id_payment_gateways' }),
    __metadata("design:type", payment_gateway_entity_1.PaymentGateway)
], ProductPayment.prototype, "paymentGateway", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => payment_status_entity_1.PaymentStatus),
    (0, typeorm_1.JoinColumn)({ name: 'id_payment_status' }),
    __metadata("design:type", payment_status_entity_1.PaymentStatus)
], ProductPayment.prototype, "paymentStatus", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProductPayment.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2 }),
    __metadata("design:type", Number)
], ProductPayment.prototype, "total", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, name: 'total_receive_barbershop' }),
    __metadata("design:type", Number)
], ProductPayment.prototype, "totalReceiveBarbershop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => commission_value_product_entity_1.CommissionValueProduct),
    (0, typeorm_1.JoinColumn)({ name: 'id_commission_product' }),
    __metadata("design:type", commission_value_product_entity_1.CommissionValueProduct)
], ProductPayment.prototype, "commission", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], ProductPayment.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], ProductPayment.prototype, "updatedAt", void 0);
exports.ProductPayment = ProductPayment = __decorate([
    (0, typeorm_1.Entity)('product_payments')
], ProductPayment);
//# sourceMappingURL=product-payment.entity.js.map