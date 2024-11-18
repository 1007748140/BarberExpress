// src/config/jwt.config.ts
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
}

export interface TokenPayload {
    id: number;
    email: string;
    roles: string[]; // Cambiado de role a roles para soportar múltiples roles
}

export const generateToken = (
    userId: number, 
    email: string, 
    roles: string[] // Cambiado de role a roles
): string => {
    const payload: TokenPayload = {
        id: userId,
        email,
        roles
    };

    return jwt.sign(payload, JWT_SECRET, { 
        expiresIn: JWT_EXPIRES_IN 
    });
};

export const verifyToken = (token: string): TokenPayload => {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        throw new Error('Token verification failed');
    }
};
