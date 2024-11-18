"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const barbershop_controller_1 = require("../controllers/barbershop.controller");
const barbershop_service_controller_1 = require("../controllers/barbershop-service.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const barbershopController = new barbershop_controller_1.BarbershopController();
const barbershopServiceController = new barbershop_service_controller_1.BarbershopServiceController();
router.post('/', (0, auth_middleware_1.authMiddleware)(['AdminBarberia']), barbershopController.create);
router.put('/:id', (0, auth_middleware_1.authMiddleware)(['AdminBarberia']), barbershopController.update);
router.get('/:id', barbershopController.getById);
router.get('/', barbershopController.getAll);
router.delete('/:id', (0, auth_middleware_1.authMiddleware)(['AdminBarberia']), barbershopController.delete);
router.post('/:barbershopId/services', (0, auth_middleware_1.authMiddleware)(['AdminBarberia']), barbershopServiceController.addService);
router.get('/:barbershopId/services', barbershopServiceController.getServices);
router.delete('/:barbershopId/services/:serviceId', (0, auth_middleware_1.authMiddleware)(['AdminBarberia']), barbershopServiceController.removeService);
exports.default = router;
//# sourceMappingURL=barbershop.routes.js.map