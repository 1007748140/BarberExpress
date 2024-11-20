// src/modules/products/routes/product.routes.ts
import { Router, Request, Response } from 'express';
import { ProductController } from '../controllers/product.controller';
import { InventoryController } from '../controllers/inventory.controller';
import { ProductPaymentController } from '../controllers/product-payment.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { ParamsDictionary } from 'express-serve-static-core';

interface TypedRequestParams<T> extends Request {
    params: T & ParamsDictionary;
}

const router = Router();
const productController = new ProductController();
const inventoryController = new InventoryController();
const productPaymentController = new ProductPaymentController();

// Rutas para productos de barbería
router.post(
    '/barbershop',
    authMiddleware(['AdminBarberia']),
    productController.addProductToBarbershop
);

router.get(
    '/barbershop/:barbershopId',
    (req: TypedRequestParams<{ barbershopId: string }>, res: Response) => 
        productController.getBarbershopProducts(req, res)
);

router.delete(
    '/barbershop/:barbershopId/product/:productId',
    authMiddleware(['AdminBarberia']),
    productController.removeProductFromBarbershop
);

// Rutas para inventario
router.put(
    '/inventory/:barbershopProductId',
    authMiddleware(['AdminBarberia']),
    inventoryController.updateInventory
);

router.get(
    '/inventory/:barbershopProductId',
    authMiddleware(['AdminBarberia']),
    (req: TypedRequestParams<{ barbershopProductId: string }>, res: Response) => 
        inventoryController.getInventory(req, res)
);

// Rutas para pagos de productos
router.post(
    '/payments',
    authMiddleware(['Cliente']),
    productPaymentController.createPayment
);

router.get(
    '/payments/user',
    authMiddleware(['Cliente']),
    productPaymentController.getUserPayments
);

export default router;