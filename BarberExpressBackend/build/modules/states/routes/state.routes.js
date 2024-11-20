"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const state_controller_1 = require("../controllers/state.controller");
const router = (0, express_1.Router)();
const departmentController = new state_controller_1.DepartmentController();
router.get('/', departmentController.getDepartmentsByCountry);
exports.default = router;
//# sourceMappingURL=state.routes.js.map