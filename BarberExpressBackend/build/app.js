"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const user_routes_1 = __importDefault(require("./modules/users/routes/user.routes"));
const auth_routes_1 = __importDefault(require("./modules/auth/routes/auth.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/users', user_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
database_1.AppDataSource.initialize()
    .then(() => {
    console.log("Base de datos conectada exitosamente");
})
    .catch((error) => console.log(error));
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
exports.default = app;
//# sourceMappingURL=app.js.map