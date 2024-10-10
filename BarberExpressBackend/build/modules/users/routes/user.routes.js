"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
router.post('/', userController.create);
router.get('/:id', auth_middleware_1.authMiddleware, userController.findOne);
router.put('/:id', auth_middleware_1.authMiddleware, userController.update);
exports.default = router;
//# sourceMappingURL=user.routes.js.map