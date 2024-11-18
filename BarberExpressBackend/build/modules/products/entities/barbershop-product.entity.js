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
exports.BarbershopProduct = void 0;
const typeorm_1 = require("typeorm");
const barbershop_entity_1 = require("../../barbershops/entities/barbershop.entity");
const bank_product_entity_1 = require("./bank-product.entity");
const inventory_entity_1 = require("./inventory.entity");
let BarbershopProduct = class BarbershopProduct {
};
exports.BarbershopProduct = BarbershopProduct;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BarbershopProduct.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => barbershop_entity_1.Barbershop),
    (0, typeorm_1.JoinColumn)({ name: 'id_barbershop' }),
    __metadata("design:type", barbershop_entity_1.Barbershop)
], BarbershopProduct.prototype, "barbershop", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => bank_product_entity_1.BankProduct),
    (0, typeorm_1.JoinColumn)({ name: 'id_product' }),
    __metadata("design:type", bank_product_entity_1.BankProduct)
], BarbershopProduct.prototype, "product", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => inventory_entity_1.Inventory, inventory => inventory.barbershopProduct),
    __metadata("design:type", inventory_entity_1.Inventory)
], BarbershopProduct.prototype, "inventory", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], BarbershopProduct.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], BarbershopProduct.prototype, "updatedAt", void 0);
exports.BarbershopProduct = BarbershopProduct = __decorate([
    (0, typeorm_1.Entity)('barbershop_products')
], BarbershopProduct);
//# sourceMappingURL=barbershop-product.entity.js.map