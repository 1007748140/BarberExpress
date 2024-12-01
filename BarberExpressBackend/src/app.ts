// src/app.ts
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import path from 'path';
import { AppDataSource } from './config/database';

// Importación de rutas
import authRoutes from './modules/auth/routes/auth.routes';
import barbershopRoutes from './modules/barbershops/routes/barbershop.routes';
import appointmentRoutes from './modules/appointments/routes/appointment.routes';
import postRoutes from './modules/posts/routes/post.routes';
import productRoutes from './modules/products/routes/product.routes';
import userInfoRoutes from './modules/user-info/routes/user-info.routes';
import profileRoutes from './modules/profiles/routes/profile.routes';
import locationRoutes from './modules/location/routes/location.routes';
import uploadRoutes from './modules/upload/routes/upload.routes';

// Sentry
const Sentry = require('@sentry/node');

const app = express();

// Configurar sentry
Sentry.init({
    dsn: process.env.SENTRY_DSN,
    tracesSampleRate: 1.0,
});

// Middleware para capturar errores
app.use(Sentry.Handlers.requestHandler());

// Middlewares globales
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de rutas base API
const API_BASE_PATH = '/api';

// Rutas de la API
app.use(`${API_BASE_PATH}/auth`, authRoutes);
app.use(`${API_BASE_PATH}/barbershops`, barbershopRoutes);
app.use(`${API_BASE_PATH}/appointments`, appointmentRoutes);
app.use(`${API_BASE_PATH}/posts`, postRoutes);
app.use(`${API_BASE_PATH}/products`, productRoutes);
app.use(`${API_BASE_PATH}/user-info`, userInfoRoutes);
app.use(`${API_BASE_PATH}/profiles`, profileRoutes);
app.use(`${API_BASE_PATH}/location`, locationRoutes);
app.use(`${API_BASE_PATH}/upload`, uploadRoutes);

// Finalizar captura de errores
app.use(Sentry.Handlers.errorHandler());

// Servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Middleware para manejar rutas no encontradas
app.use((req: Request, res: Response, next: NextFunction) => {
    if (!req.route) {
        return res.status(404).json({
            success: false,
            message: 'Ruta no encontrada'
        });
    }
    next();
});

// Middleware para manejo de errores
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err);
    
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err : undefined
    });
});

// Inicializar base de datos y servidor
const initializeServer = async () => {
    try {
        // Conectar a la base de datos
        await AppDataSource.initialize();
        console.log("Base de datos conectada exitosamente");

        // Configurar y arrancar el servidor
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
            console.log(`API disponible en http://localhost:${PORT}${API_BASE_PATH}`);
        });
    } catch (error) {
        console.error("Error al inicializar el servidor:", error);
        process.exit(1);
    }
};

// Crear el directorio de uploads si no existe
import fs from 'fs';
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Iniciar el servidor
initializeServer();

export default app;