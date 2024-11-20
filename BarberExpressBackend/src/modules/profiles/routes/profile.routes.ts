// src/modules/profiles/routes/profile.routes.ts
import { Router, Request, Response } from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { checkJwt } from '../../../middlewares/checkJwt';
import { CreateProfileDto } from '../dtos/create-profile.dto';
import { UpdateProfileDto } from '../dtos/update-profile.dto';
import { ProfileService } from '../services/profile.service'; // Importamos el servicio
import { AppDataSource } from '../../../config/database'; // Importamos la conexión a la base de datos
import { Profile } from '../entities/profile.entity';
import { User } from '../../auth/entities/user.entity';

const router = Router();

// Inicializamos el servicio y el controlador correctamente
const profileService = new ProfileService(
    AppDataSource.getRepository(Profile),
    AppDataSource.getRepository(User)
);
const profileController = new ProfileController(profileService);

// Aplicar middleware de autenticación a todas las rutas
router.use(checkJwt);

// Obtener perfil del usuario autenticado
router.get('/me', (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    profileController.getProfile({ user: { id: userId } } as any)
        .then(profile => {
            res.json(profile);
        })
        .catch(error => {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido al obtener el perfil';
            res.status(500).json({ message: errorMessage });
        });
});

// Obtener perfil por ID
router.get('/:id', (req: Request, res: Response) => {
    profileController.findOne(req.params.id)
        .then(profile => {
            res.json(profile);
        })
        .catch(error => {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido al obtener el perfil';
            res.status(500).json({ message: errorMessage });
        });
});

// Crear perfil
router.post('/', (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const createProfileDto: CreateProfileDto = req.body;
    profileController.create(createProfileDto, { user: { id: userId } } as any)
        .then(profile => {
            res.status(201).json(profile);
        })
        .catch(error => {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido al crear el perfil';
            res.status(500).json({ message: errorMessage });
        });
});

// Actualizar perfil
router.put('/me', (req: Request, res: Response) => {
    const userId = (req as any).user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'Usuario no autenticado' });
    }

    const updateProfileDto: UpdateProfileDto = req.body;
    profileController.update({ user: { id: userId } } as any, updateProfileDto)
        .then(profile => {
            res.json(profile);
        })
        .catch(error => {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido al actualizar el perfil';
            res.status(500).json({ message: errorMessage });
        });
});

// Eliminar perfil
router.delete('/:id', (req: Request, res: Response) => {
    profileController.remove(req.params.id)
        .then(() => {
            res.json({ message: 'Perfil eliminado exitosamente' });
        })
        .catch(error => {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido al eliminar el perfil';
            res.status(500).json({ message: errorMessage });
        });
});

export default router;