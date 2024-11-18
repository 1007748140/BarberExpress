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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const database_1 = require("./config/database");
const auth_routes_1 = __importDefault(require("./modules/auth/routes/auth.routes"));
const barbershop_routes_1 = __importDefault(require("./modules/barbershops/routes/barbershop.routes"));
const appointment_routes_1 = __importDefault(require("./modules/appointments/routes/appointment.routes"));
const post_routes_1 = __importDefault(require("./modules/posts/routes/post.routes"));
const product_routes_1 = __importDefault(require("./modules/products/routes/product.routes"));
const user_info_routes_1 = __importDefault(require("./modules/user-info/routes/user-info.routes"));
const profile_routes_1 = __importDefault(require("./modules/profiles/routes/profile.routes"));
const location_routes_1 = __importDefault(require("./modules/location/routes/location.routes"));
const upload_routes_1 = __importDefault(require("./modules/upload/routes/upload.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const API_BASE_PATH = '/api';
app.use(`${API_BASE_PATH}/auth`, auth_routes_1.default);
app.use(`${API_BASE_PATH}/barbershops`, barbershop_routes_1.default);
app.use(`${API_BASE_PATH}/appointments`, appointment_routes_1.default);
app.use(`${API_BASE_PATH}/posts`, post_routes_1.default);
app.use(`${API_BASE_PATH}/products`, product_routes_1.default);
app.use(`${API_BASE_PATH}/user-info`, user_info_routes_1.default);
app.use(`${API_BASE_PATH}/profiles`, profile_routes_1.default);
app.use(`${API_BASE_PATH}/location`, location_routes_1.default);
app.use(`${API_BASE_PATH}/upload`, upload_routes_1.default);
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
app.use((req, res, next) => {
    if (!req.route) {
        return res.status(404).json({
            success: false,
            message: 'Ruta no encontrada'
        });
    }
    next();
});
app.use((err, _req, res, _next) => {
    console.error('Error:', err);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err : undefined
    });
});
const initializeServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.AppDataSource.initialize();
        console.log("Base de datos conectada exitosamente");
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`API disponible en http://localhost:${PORT}${API_BASE_PATH}`);
        });
    }
    catch (error) {
        console.error("Error al inicializar el servidor:", error);
        process.exit(1);
    }
});
const fs_1 = __importDefault(require("fs"));
const uploadsDir = path_1.default.join(__dirname, '../uploads');
if (!fs_1.default.existsSync(uploadsDir)) {
    fs_1.default.mkdirSync(uploadsDir, { recursive: true });
}
initializeServer();
exports.default = app;
//# sourceMappingURL=app.js.map