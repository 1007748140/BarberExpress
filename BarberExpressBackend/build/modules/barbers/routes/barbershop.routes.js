"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const barbershop_controller_1 = require("../controllers/barbershop.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const barbershopController = new barbershop_controller_1.BarbershopController();
router.post('/', (0, auth_middleware_1.authMiddleware)(['barbero']), barbershopController.createBarbershop);
router.get('/my-barbershops', (0, auth_middleware_1.authMiddleware)(['barbero']), barbershopController.getBarbershopsByUser);
exports.default = router;
//# sourceMappingURL=barbershop.routes.js.map