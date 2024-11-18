"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const country_controller_1 = require("../controllers/country.controller");
const router = (0, express_1.Router)();
const countryController = new country_controller_1.CountryController();
router.get('/', countryController.getCountries);
exports.default = router;
//# sourceMappingURL=country.routes.js.map