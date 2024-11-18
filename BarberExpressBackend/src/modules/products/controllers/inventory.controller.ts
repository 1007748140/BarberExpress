// src/modules/products/controllers/inventory.controller.ts
import { Request, Response } from 'express';
import { InventoryService } from '../services/inventory.service';
import { UpdateInventoryDto } from '../dtos/update-inventory.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthenticatedRequest } from '../../../middlewares/auth.middleware';

export class InventoryController {
    private inventoryService: InventoryService;

    constructor() {
        this.inventoryService = new InventoryService();
    }

    updateInventory = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { barbershopProductId } = req.params as { barbershopProductId: string };
            const updateInventoryDto = plainToClass(UpdateInventoryDto, req.body);
            const errors = await validate(updateInventoryDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.inventoryService.updateInventory(
                Number(barbershopProductId),
                updateInventoryDto
            );
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al actualizar el inventario',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getInventory = async (req: Request<{ barbershopProductId: string }>, res: Response): Promise<void> => {
        try {
            const { barbershopProductId } = req.params;
            const result = await this.inventoryService.getInventory(Number(barbershopProductId));
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener el inventario',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}