// src/modules/roles/routes/role.routes.ts
import { Router } from 'express';
import { RoleController } from '../controllers/role.controller';

const router = Router();
const roleController = new RoleController();

router.get('/', roleController.getRoles);

export default router;