"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkJwt = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("../config"));
const checkJwt = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: 'No se proporcionó token de autorización'
            });
        }
        const [bearer, token] = authHeader.split(' ');
        if (bearer !== 'Bearer' || !token) {
            return res.status(401).json({
                message: 'Formato de token inválido'
            });
        }
        if (!config_1.default.jwtSecret) {
            return res.status(500).json({
                message: 'Error de configuración del servidor'
            });
        }
        try {
            const payload = (0, jsonwebtoken_1.verify)(token, config_1.default.jwtSecret);
            req.user = {
                id: payload.id,
                email: payload.email,
                roles: payload.roles
            };
            next();
        }
        catch (jwtError) {
            return res.status(401).json({
                message: 'Token inválido o expirado'
            });
        }
    }
    catch (error) {
        console.error('Error en checkJwt:', error);
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};
exports.checkJwt = checkJwt;
//# sourceMappingURL=checkJwt.js.map