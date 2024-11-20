// src/middlewares/checkJwt.ts
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config';

export interface JwtPayload {
    id: number;
    email: string;
    roles: string[];
    iat?: number;
    exp?: number;
}

export interface RequestWithUser extends Request {
    user?: JwtPayload;
}

export const checkJwt = (req: RequestWithUser, res: Response, next: NextFunction) => {
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

        if (!config.jwtSecret) {
            return res.status(500).json({
                message: 'Error de configuración del servidor'
            });
        }

        try {
            const payload = verify(token, config.jwtSecret) as JwtPayload;
            req.user = {
                id: payload.id,
                email: payload.email,
                roles: payload.roles
            };
            next();
        } catch (jwtError) {
            return res.status(401).json({
                message: 'Token inválido o expirado'
            });
        }
    } catch (error) {
        console.error('Error en checkJwt:', error);
        return res.status(500).json({
            message: 'Error interno del servidor'
        });
    }
};