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
exports.ProductController = void 0;
const product_service_1 = require("../services/product.service");
const create_product_dto_1 = require("../dtos/create-product.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class ProductController {
    constructor() {
        this.addProductToBarbershop = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const createProductDto = (0, class_transformer_1.plainToClass)(create_product_dto_1.CreateBarbershopProductDto, req.body);
                const errors = yield (0, class_validator_1.validate)(createProductDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const result = yield this.productService.addProductToBarbershop(createProductDto);
                res.status(201).json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al agregar el producto',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getBarbershopProducts = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { barbershopId } = req.params;
                const result = yield this.productService.getBarbershopProducts(Number(barbershopId));
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener los productos',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.removeProductFromBarbershop = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { barbershopId, productId } = req.params;
                yield this.productService.removeProductFromBarbershop(Number(barbershopId), Number(productId));
                res.json({ message: 'Producto eliminado exitosamente' });
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al eliminar el producto',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.productService = new product_service_1.ProductService();
    }
}
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map