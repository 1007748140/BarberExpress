"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryController = void 0;
const country_service_1 = require("../services/country.service");
class CountryController {
    constructor() {
        this.getCountries = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const countries = yield this.countryService.getCountries();
                res.json(countries);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
        this.countryService = new country_service_1.CountryService();
    }
}
exports.CountryController = CountryController;
//# sourceMappingURL=country.controller.js.map