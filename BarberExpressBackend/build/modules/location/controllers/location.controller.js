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
exports.LocationController = void 0;
const location_service_1 = require("../services/location.service");
class LocationController {
    constructor() {
        this.getLocationData = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield this.locationService.getLocationData();
                res.json(result);
            }
            catch (error) {
                res.status(500).json({
                    message: 'Error al obtener datos de ubicación',
                    error: error instanceof Error ? error.message : 'Unknown error'
                });
            }
        });
        this.locationService = new location_service_1.LocationService();
    }
}
exports.LocationController = LocationController;
//# sourceMappingURL=location.controller.js.map