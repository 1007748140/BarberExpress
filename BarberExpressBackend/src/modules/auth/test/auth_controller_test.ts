import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';  // Importa el servicio de autenticación
import { Request, Response } from 'express';  // Importa los tipos de Express para request y response
import { LoginDto } from '../dtos/login.dto';  // DTO de Login para validación
import { RegisterDto } from '../dtos/register.dto';  // DTO de Registro para validación
import { validate } from 'class-validator';  // Para validar los DTOs
import { plainToClass } from 'class-transformer';  // Para convertir objetos planos a instancias de clases

// Mockea el servicio de autenticación para simular su comportamiento sin conectarse a la base de datos
jest.mock('../services/auth.service');

describe('AuthController', () => {
    let authController: AuthController;  // Instancia del controlador
    let authService: AuthService;  // Instancia del servicio mockeado
    let req: Partial<Request>;  // Objeto mockeado de Request
    let res: Partial<Response>;  // Objeto mockeado de Response
    let status: jest.Mock;  // Mock de la función `status` de la respuesta
    let json: jest.Mock;  // Mock de la función `json` de la respuesta

    beforeEach(() => {
        authService = new AuthService();  // Inicializa el servicio de autenticación
        authController = new AuthController();  // Inicializa el controlador de autenticación
        req = { body: {} };  // Inicia el objeto `req` con un cuerpo vacío
        status = jest.fn().mockReturnThis();  // Mockea la función `status` para que devuelva la respuesta actual
        json = jest.fn();  // Mockea la función `json` para verificar la respuesta
        res = { status, json };  // Crea un objeto `res` con las funciones mockeadas
    });

    describe('login', () => {
        // Prueba cuando la validación falla (por ejemplo, si el email no es válido)
        it('should return 400 if validation fails', async () => {
            req.body = { email: 'invalid-email', password: '' };  // Datos inválidos
            await authController.login(req as Request, res as Response);  // Llama al método `login` del controlador
            expect(status).toHaveBeenCalledWith(400);  // Verifica que el código de estado sea 400 (Bad Request)
            expect(json).toHaveBeenCalledWith(expect.any(Object));  // Verifica que la respuesta contenga un objeto de errores de validación
        });

        // Prueba cuando el login falla debido a credenciales incorrectas
        it('should return 401 if login fails', async () => {
            req.body = { email: 'test@example.com', password: 'wrong-password' };  // Datos válidos pero con contraseña incorrecta
            jest.spyOn(authService, 'login').mockRejectedValue(new Error('Invalid credentials'));  // Mockea el error en el servicio
            await authController.login(req as Request, res as Response);  // Llama al método `login`
            expect(status).toHaveBeenCalledWith(401);  // Verifica que el código de estado sea 401 (Unauthorized)
            expect(json).toHaveBeenCalledWith({ success: false, message: 'Invalid credentials' });  // Verifica que la respuesta tenga el mensaje de error adecuado
        });

        // Prueba cuando el login es exitoso
        it('should return user data if login succeeds', async () => {
            req.body = { email: 'test@example.com', password: 'password123' };  // Datos válidos para login

            const result = {  // Datos esperados como resultado del login exitoso
                success: true,
                token: 'jwt-token',
                user: {
                    id: 1,
                    email: 'test@example.com',
                    roles: ['Barbero'],
                    barber_state: {
                        id: 1,
                        status: 'Disponible',
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                    created_at: new Date(),
                    updated_at: new Date(),
                }
            };

            jest.spyOn(authService, 'login').mockResolvedValue(result);  // Mockea el resultado exitoso del servicio `login`
            await authController.login(req as Request, res as Response);  // Llama al método `login`
            expect(json).toHaveBeenCalledWith(result);  // Verifica que la respuesta del controlador sea la correcta
        });
    });

    describe('register', () => {
        // Prueba cuando la validación falla en el registro (por ejemplo, un email inválido)
        it('should return 400 if validation fails', async () => {
            req.body = { email: 'invalid-email', password: '' };  // Datos inválidos
            await authController.register(req as Request, res as Response);  // Llama al método `register`
            expect(status).toHaveBeenCalledWith(400);  // Verifica que se devuelva un código de estado 400
            expect(json).toHaveBeenCalledWith(expect.any(Object));  // Verifica que se devuelvan errores de validación
        });

        // Prueba cuando el registro falla por un error en el servicio
        it('should return 500 if registration fails', async () => {
            req.body = {  // Datos completos de registro válidos
                email: 'test@example.com',
                password: 'password123',
                role: 'Barbero',
                firstName: 'John',
                lastName: 'Doe',
                phone: '123456789',
                latitude: 0,
                longitude: 0,
                countryId: 1,
                departmentId: 1
            };
            jest.spyOn(authService, 'register').mockRejectedValue(new Error('Registration error'));  // Simula un error en el servicio
            await authController.register(req as Request, res as Response);  // Llama al método `register`
            expect(status).toHaveBeenCalledWith(500);  // Verifica que se devuelva un código de estado 500
            expect(json).toHaveBeenCalledWith({ success: false, message: 'Registration error' });  // Verifica el mensaje de error
        });

        // Prueba cuando el registro es exitoso
        it('should return user data if registration succeeds', async () => {
            req.body = {  // Datos válidos para registro
                email: 'test@example.com',
                password: 'password123',
                role: 'Barbero',
                firstName: 'John',
                lastName: 'Doe',
                phone: '123456789',
                latitude: 0,
                longitude: 0,
                countryId: 1,
                departmentId: 1
            };

            const result = {  // Datos que el servicio debe devolver cuando el registro sea exitoso
                success: true,
                token: 'jwt-token',
                user: {
                    id: 1,
                    email: 'test@example.com',
                    roles: ['Barbero'],
                    barber_state: {
                        id: 1,
                        status: 'Disponible',
                        created_at: new Date(),
                        updated_at: new Date(),
                    },
                    created_at: new Date(),
                    updated_at: new Date(),
                }
            };

            jest.spyOn(authService, 'register').mockResolvedValue(result);  // Mockea el resultado exitoso del servicio
            await authController.register(req as Request, res as Response);  // Llama al método `register`
            expect(status).toHaveBeenCalledWith(201);  // Verifica que el código de estado sea 201 (Created)
            expect(json).toHaveBeenCalledWith(result);  // Verifica que se devuelvan los datos correctos del usuario
        });
    });
});
