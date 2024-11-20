// src/modules/auth/controllers/auth.controller.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RegisterDto } from '../dtos/register.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    login = async (req: Request, res: Response): Promise<void> => {
        try {
            const loginDto = plainToClass(LoginDto, req.body);
            const errors = await validate(loginDto);

            if (errors.length > 0) {
                res.status(400).json({ errors });
                return;
            }

            const result = await this.authService.login(loginDto.email, loginDto.password);
            res.json(result);
        } catch (error: any) {
            console.error('Login error:', error);
            res.status(401).json({ 
                success: false,
                message: error.message 
            });
        }
    };

    register = async (req: Request, res: Response): Promise<void> => {
        try {
            console.log('Received registration request:', req.body);
            
            const registerDto = plainToClass(RegisterDto, req.body);
            const errors = await validate(registerDto);

            if (errors.length > 0) {
                console.log('Validation errors:', errors);
                res.status(400).json({ 
                    success: false,
                    errors: errors.map(error => ({
                        property: error.property,
                        constraints: error.constraints
                    }))
                });
                return;
            }

            const result = await this.authService.register(registerDto);
            res.status(201).json(result);
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({
                success: false,
                message: error instanceof Error ? error.message : 'Error al registrar usuario'
            });
        }
    };
}