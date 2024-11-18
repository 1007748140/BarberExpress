// src/modules/user-info/routes/user-info.routes.ts
import { Router } from 'express';
import { UserLocationController } from '../controllers/user-location.controller';
import { BankAccountController } from '../controllers/bank-account.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const router = Router();
const userLocationController = new UserLocationController();
const bankAccountController = new BankAccountController();

// Rutas para ubicación de usuario
router.post(
    '/location',
    authMiddleware(['Cliente', 'Barbero', 'AdminBarberia']),
    userLocationController.create
);

router.get(
    '/location',
    authMiddleware(['Cliente', 'Barbero', 'AdminBarberia']),
    userLocationController.getUserLocation
);

router.get(
    '/countries',
    userLocationController.getCountries
);

router.get(
    '/departments/:countryId',
    userLocationController.getDepartments
);

// Rutas para cuentas bancarias
router.post(
    '/bank-accounts',
    authMiddleware(['Barbero', 'AdminBarberia']),
    bankAccountController.create
);

router.get(
    '/bank-accounts',
    authMiddleware(['Barbero', 'AdminBarberia']),
    bankAccountController.getUserBankAccounts
);

router.get(
    '/document-types',
    authMiddleware(['Barbero', 'AdminBarberia']),
    bankAccountController.getDocumentTypes
);

router.get(
    '/account-types',
    authMiddleware(['Barbero', 'AdminBarberia']),
    bankAccountController.getAccountTypes
);

router.delete(
    '/bank-accounts/:id',
    authMiddleware(['Barbero', 'AdminBarberia']),
    bankAccountController.delete
);

export default router;