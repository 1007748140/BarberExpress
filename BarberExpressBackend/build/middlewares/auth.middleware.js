"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jwt_config_1 = require("../config/jwt.config");
const authMiddleware = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({
                    success: false,
                    message: 'Authorization header must start with Bearer'
                });
            }
            const token = authHeader.split(' ')[1];
            const decoded = (0, jwt_config_1.verifyToken)(token);
            req.user = decoded;
            if (allowedRoles && allowedRoles.length > 0) {
                const hasAllowedRole = decoded.roles.some(role => allowedRoles.includes(role));
                if (!hasAllowedRole) {
                    return res.status(403).json({
                        success: false,
                        message: 'No tienes permiso para realizar esta acción'
                    });
                }
            }
            next();
        }
        catch (error) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired token',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.middleware.js.map