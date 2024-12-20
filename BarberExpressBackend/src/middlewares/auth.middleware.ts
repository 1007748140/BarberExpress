// src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from 'express';
import { verifyToken, TokenPayload } from '../config/jwt.config';

export interface AuthenticatedRequest extends Request {
    user?: TokenPayload;
}

export const authMiddleware = (allowedRoles?: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        try {
            const authHeader = req.headers.authorization;
            
            if (!authHeader || typeof authHeader !== 'string' || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({ 
                    success: false,
                    message: 'Authorization header is missing or malformed' 
                });
            }

            const token = authHeader.split(' ')[1];
            if (!token) {
                return res.status(401).json({ 
                    success: false,
                    message: 'Token is missing from the Authorization header' 
                });
            }

            const decoded = verifyToken(token);
            req.user = decoded;

            if (allowedRoles && allowedRoles.length > 0) {
                const hasAllowedRole = decoded.roles.some(role => 
                    allowedRoles.includes(role)
                );
                
                if (!hasAllowedRole) {
                    return res.status(403).json({
                        success: false,
                        message: 'No tienes permiso para realizar esta acción'
                    });
                }
            }

            next();
        } catch (error) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid or expired token',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
};
