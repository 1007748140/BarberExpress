// src/app.ts
import 'reflect-metadata';
// resto de tus imports
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/database';
import userRoutes from './modules/users/routes/user.routes';
import authRoutes from './modules/auth/routes/auth.routes';


const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Inicializar conexión a la base de datos
AppDataSource.initialize()
    .then(() => {
        console.log("Base de datos conectada exitosamente");
    })
    .catch((error) => console.log(error));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;