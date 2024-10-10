// src/config/jwt.config.ts
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in the environment variables.');
}

const JWT_EXPIRES_IN = '24h';

export const generateToken = (userId: number, email: string): string => {
    return jwt.sign(
        {
            id: userId,
            email
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
    );
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};
