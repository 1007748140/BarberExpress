// src/modules/products/services/inventory.service.ts
import { AppDataSource } from '../../../config/database';
import { Inventory } from '../entities/inventory.entity';
import { UpdateInventoryDto } from '../dtos/update-inventory.dto';

export class InventoryService {
    private inventoryRepository = AppDataSource.getRepository(Inventory);

    async updateInventory(
        barbershopProductId: number,
        updateInventoryDto: UpdateInventoryDto
    ): Promise<Inventory> {
        const inventory = await this.inventoryRepository.findOne({
            where: { barbershopProduct: { id: barbershopProductId } }
        });

        if (!inventory) {
            throw new Error('Inventario no encontrado');
        }

        inventory.quantity = updateInventoryDto.quantity;
        return await this.inventoryRepository.save(inventory);
    }

    async getInventory(barbershopProductId: number): Promise<Inventory> {
        const inventory = await this.inventoryRepository.findOne({
            where: { barbershopProduct: { id: barbershopProductId } },
            relations: ['barbershopProduct', 'barbershopProduct.product']
        });

        if (!inventory) {
            throw new Error('Inventario no encontrado');
        }

        return inventory;
    }
}