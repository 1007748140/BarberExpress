"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const database_1 = require("../../../config/database");
const barbershop_product_entity_1 = require("../entities/barbershop-product.entity");
const barbershop_entity_1 = require("../../barbershops/entities/barbershop.entity");
const bank_product_entity_1 = require("../entities/bank-product.entity");
const inventory_entity_1 = require("../entities/inventory.entity");
class ProductService {
    constructor() {
        this.barbershopProductRepository = database_1.AppDataSource.getRepository(barbershop_product_entity_1.BarbershopProduct);
        this.barbershopRepository = database_1.AppDataSource.getRepository(barbershop_entity_1.Barbershop);
        this.bankProductRepository = database_1.AppDataSource.getRepository(bank_product_entity_1.BankProduct);
        this.inventoryRepository = database_1.AppDataSource.getRepository(inventory_entity_1.Inventory);
    }
    addProductToBarbershop(createProductDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const barbershop = yield this.barbershopRepository.findOne({
                where: { id: createProductDto.barbershopId }
            });
            if (!barbershop) {
                throw new Error('Barbería no encontrada');
            }
            const bankProduct = yield this.bankProductRepository.findOne({
                where: { id: createProductDto.bankProductId }
            });
            if (!bankProduct) {
                throw new Error('Producto no encontrado');
            }
            const existingProduct = yield this.barbershopProductRepository.findOne({
                where: {
                    barbershop: { id: createProductDto.barbershopId },
                    product: { id: createProductDto.bankProductId }
                }
            });
            if (existingProduct) {
                throw new Error('Este producto ya está registrado en la barbería');
            }
            const barbershopProduct = this.barbershopProductRepository.create({
                barbershop,
                product: bankProduct
            });
            const savedProduct = yield this.barbershopProductRepository.save(barbershopProduct);
            const inventory = this.inventoryRepository.create({
                barbershopProduct: savedProduct,
                quantity: createProductDto.initialQuantity
            });
            yield this.inventoryRepository.save(inventory);
            return savedProduct;
        });
    }
    getBarbershopProducts(barbershopId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.barbershopProductRepository.find({
                where: { barbershop: { id: barbershopId } },
                relations: ['product', 'product.classification', 'inventory']
            });
        });
    }
    removeProductFromBarbershop(barbershopId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.barbershopProductRepository.delete({
                barbershop: { id: barbershopId },
                product: { id: productId }
            });
            if (result.affected === 0) {
                throw new Error('Producto no encontrado en la barbería');
            }
        });
    }
}
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map