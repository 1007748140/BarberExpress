// src/modules/states/routes/state.routes.ts
import { Router } from 'express';
import { DepartmentController } from '../controllers/state.controller';

const router = Router();
const departmentController = new DepartmentController();

router.get('/', departmentController.getDepartmentsByCountry);

export default router;