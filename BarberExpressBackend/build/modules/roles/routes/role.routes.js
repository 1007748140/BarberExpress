"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = require("../controllers/role.controller");
const router = (0, express_1.Router)();
const roleController = new role_controller_1.RoleController();
router.get('/', roleController.getRoles);
exports.default = router;
//# sourceMappingURL=role.routes.js.map