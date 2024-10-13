// src/modules/states/routes/state.routes.ts
import { Router } from 'express';
import { StateController } from '../controllers/state.controller';

const router = Router();
const stateController = new StateController();

router.get('/', stateController.getStatesByCountry);

export default router;