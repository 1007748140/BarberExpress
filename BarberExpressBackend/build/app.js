"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const body_parser_1 = require("body-parser");
const cors_1 = require("cors");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/', (_req, res) => {
    res.send('Servidor de BarberExpress funcionando');
});
mongoose_1.default.connect('mongodb://localhost:27017/barberexpress')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.error('Error al conectar a MongoDB:', error));
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
//# sourceMappingURL=app.js.map