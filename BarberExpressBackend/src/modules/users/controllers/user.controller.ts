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

    registerUser = async (req: Request, res: Response): Promise<Response> => {
        try {
            // Transformar el body a una instancia de CreateUserDto
            const userData = plainToClass(CreateUserDto, {
                firstName: req.body.firstName || req.body.first_name,
                lastName: req.body.lastName || req.body.last_name,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                idRole: req.body.idRole || req.body.id_role,
                idCountry: req.body.idCountry || req.body.id_country,
                idDepartment: req.body.idDepartment || req.body.id_department,
                latitude: req.body.latitude,
                longitude: req.body.longitude
            });

            // Validar los datos
            const errors = await validate(userData);

            if (errors.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors.map(error => ({
                        property: error.property,
                        constraints: error.constraints
                    }))
                });
            }

            // Crear el usuario
            const newUser = await this.userService.createUser(userData);

            return res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: newUser
            });

        } catch (error) {
            // Manejar errores específicos
            if (error instanceof Error) {
                if (error.message === 'Email already exists') {
                    return res.status(409).json({
                        success: false,
                        message: 'Email already exists'
                    });
                }
                
                return res.status(400).json({
                    success: false,
                    message: error.message
                });
            }

            // Error interno del servidor
            return res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    };
}