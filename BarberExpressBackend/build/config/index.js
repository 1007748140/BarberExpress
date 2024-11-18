"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    jwtSecret: process.env.JWT_SECRET || 'tu_secreto_aqui',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h'
};
exports.default = config;
//# sourceMappingURL=index.js.map