// src/config/index.ts
interface Config {
    jwtSecret: string;
    jwtExpiresIn: string;
}

const config: Config = {
    jwtSecret: process.env.JWT_SECRET || 'tu_secreto_aqui',
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '24h'
};

export default config;