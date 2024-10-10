// src/modules/users/controllers/user.controller.ts
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const createUserDto = plainToClass(CreateUserDto, req.body);
            const errors = await validate(createUserDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const user = await this.userService.create(createUserDto);
            res.status(201).json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    findOne = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const user = await this.userService.findOne(id);

            if (!user) {
                res.status(404).json({ message: 'User not found' });
                return;
            }

            res.json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };

    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const id = parseInt(req.params.id);
            const updateUserDto = plainToClass(UpdateUserDto, req.body);
            const errors = await validate(updateUserDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const user = await this.userService.update(id, updateUserDto);
            res.json(user);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    };
}