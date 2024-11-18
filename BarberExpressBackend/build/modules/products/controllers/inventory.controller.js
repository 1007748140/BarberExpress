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
exports.InventoryController = void 0;
const inventory_service_1 = require("../services/inventory.service");
const update_inventory_dto_1 = require("../dtos/update-inventory.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class InventoryController {
    constructor() {
        this.updateInventory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { barbershopProductId } = req.params;
                const updateInventoryDto = (0, class_transformer_1.plainToClass)(update_inventory_dto_1.UpdateInventoryDto, req.body);
                const errors = yield (0, class_validator_1.validate)(updateInventoryDto);
                if (errors.length > 0) {
                    res.status(400).json({ errors });
                    return;
                }
                const result = yield this.inventoryService.updateInventory(Number(barbershopProductId), updateInventoryDto);
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al actualizar el inventario',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.getInventory = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { barbershopProductId } = req.params;
                const result = yield this.inventoryService.getInventory(Number(barbershopProductId));
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener el inventario',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.inventoryService = new inventory_service_1.InventoryService();
    }
}
exports.InventoryController = InventoryController;
//# sourceMappingURL=inventory.controller.js.map