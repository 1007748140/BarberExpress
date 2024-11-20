// src/modules/user-info/controllers/bank-account.controller.ts
import { Response } from 'express';
import { BankAccountService } from '../services/bank-account.service';
import { CreateBankAccountDto } from '../dtos/create-bank-account.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AuthenticatedRequest } from '../../../middlewares/auth.middleware';

export class BankAccountController {
    private bankAccountService: BankAccountService;

    constructor() {
        this.bankAccountService = new BankAccountService();
    }

    create = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            if (!req.user?.id) {
                res.status(401).json({ message: 'Usuario no autenticado' });
                return;
            }

            const createBankAccountDto = plainToClass(CreateBankAccountDto, req.body);
            const errors = await validate(createBankAccountDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.bankAccountService.create(
                req.user.id,
                createBankAccountDto
            );
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al crear la cuenta bancaria',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getUserBankAccounts = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            if (!req.user?.id) {
                res.status(401).json({ message: 'Usuario no autenticado' });
                return;
            }

            const result = await this.bankAccountService.getUserBankAccounts(req.user.id);
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener las cuentas bancarias',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getDocumentTypes = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const result = await this.bankAccountService.getDocumentTypes();
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los tipos de documento',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    getAccountTypes = async (_req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const result = await this.bankAccountService.getAccountTypes();
            res.json(result);
        } catch (error) {
            res.status(500).json({
                message: 'Error al obtener los tipos de cuenta',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    delete = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await this.bankAccountService.delete(Number(id));
            res.json({ message: 'Cuenta bancaria eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({
                message: 'Error al eliminar la cuenta bancaria',
                error: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };
}