"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_controller_1 = require("../controllers/service.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const serviceController = new service_controller_1.ServiceController();
router.post('/', (0, auth_middleware_1.authMiddleware)(['barbero']), serviceController.createService);
router.get('/barbershop/:barbershopId', serviceController.getServicesByBarbershop);
exports.default = router;
//# sourceMappingURL=service.routes.js.map