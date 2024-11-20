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
exports.InventoryService = void 0;
const database_1 = require("../../../config/database");
const inventory_entity_1 = require("../entities/inventory.entity");
class InventoryService {
    constructor() {
        this.inventoryRepository = database_1.AppDataSource.getRepository(inventory_entity_1.Inventory);
    }
    updateInventory(barbershopProductId, updateInventoryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const inventory = yield this.inventoryRepository.findOne({
                where: { barbershopProduct: { id: barbershopProductId } }
            });
            if (!inventory) {
                throw new Error('Inventario no encontrado');
            }
            inventory.quantity = updateInventoryDto.quantity;
            return yield this.inventoryRepository.save(inventory);
        });
    }
    getInventory(barbershopProductId) {
        return __awaiter(this, void 0, void 0, function* () {
            const inventory = yield this.inventoryRepository.findOne({
                where: { barbershopProduct: { id: barbershopProductId } },
                relations: ['barbershopProduct', 'barbershopProduct.product']
            });
            if (!inventory) {
                throw new Error('Inventario no encontrado');
            }
            return inventory;
        });
    }
}
exports.InventoryService = InventoryService;
//# sourceMappingURL=inventory.service.js.map