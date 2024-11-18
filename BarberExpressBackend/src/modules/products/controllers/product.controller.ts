// src/modules/products/controllers/product.controller.ts
import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { CreateBarbershopProductDto } from '../dtos/create-product.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthenticatedRequest } from '../../../middlewares/auth.middleware';

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    addProductToBarbershop = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const createProductDto = plainToClass(CreateBarbershopProductDto, req.body);
            const errors = await validate(createProductDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.productService.addProductToBarbershop(createProductDto);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al agregar el producto',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getBarbershopProducts = async (
        req: Request<{ barbershopId: string }>, 
        res: Response
    ): Promise<void> => {
        try {
            const { barbershopId } = req.params;
            const result = await this.productService.getBarbershopProducts(Number(barbershopId));
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los productos',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    removeProductFromBarbershop = async (
        req: Request<{ barbershopId: string; productId: string }>, 
        res: Response
    ): Promise<void> => {
        try {
            const { barbershopId, productId } = req.params;
            await this.productService.removeProductFromBarbershop(
                Number(barbershopId),
                Number(productId)
            );
            res.json({ message: 'Producto eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar el producto',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}