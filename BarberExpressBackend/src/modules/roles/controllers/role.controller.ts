// src/modules/roles/controllers/role.controller.ts
import { Request, Response } from 'express';
import { RoleService } from '../services/role.service';

export class RoleController {
    private roleService: RoleService;

    constructor() {
        this.roleService = new RoleService();
    }

    getRoles = async (_req: Request, res: Response): Promise<void> => {
        try {
            const roles = await this.roleService.getRoles();
            res.json(roles);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}