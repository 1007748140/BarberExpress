"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const location_controller_1 = require("../controllers/location.controller");
const router = (0, express_1.Router)();
const locationController = new location_controller_1.LocationController();
router.get('/data', locationController.getLocationData);
exports.default = router;
//# sourceMappingURL=location.routes.js.map