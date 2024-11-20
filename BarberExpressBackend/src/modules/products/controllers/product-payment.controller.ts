// src/modules/products/controllers/product-payment.controller.ts
import { Response } from 'express';
import { ProductPaymentService } from '../services/product-payment.service';
import { CreateProductPaymentDto } from '../dtos/create-payment.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthenticatedRequest } from '../../../middlewares/auth.middleware';

export class ProductPaymentController {
    private productPaymentService: ProductPaymentService;

    constructor() {
        this.productPaymentService = new ProductPaymentService();
    }

    createPayment = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            if (!req.user?.id) {
                res.status(401).json({ message: 'Usuario no autenticado' });
                return;
            }

            const createPaymentDto = plainToClass(CreateProductPaymentDto, req.body);
            const errors = await validate(createPaymentDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.productPaymentService.createPayment(
                req.user.id,
                createPaymentDto
            );
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al procesar el pago',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getUserPayments = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            if (!req.user?.id) {
                res.status(401).json({ message: 'Usuario no autenticado' });
                return;
            }

            const result = await this.productPaymentService.getUserPayments(req.user.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los pagos',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}