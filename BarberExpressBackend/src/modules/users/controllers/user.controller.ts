// src/modules/users/controllers/user.controller.ts
import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    registerUser = async (req: Request, res: Response): Promise<void> => {
        try {
            const userData = plainToClass(CreateUserDto, req.body);
            const errors = await validate(userData);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const newUser = await this.userService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    };
}