// src/modules/auth/controllers/auth.controller.test.ts
import { Request, Response } from 'express';
import 'reflect-metadata';
import { AuthController } from './auth.controller';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

// Mock de class-validator
jest.mock('class-validator', () => ({
    IsEmail: () => jest.fn(),
    IsString: () => jest.fn(),
    IsNotEmpty: () => jest.fn(),
    validate: jest.fn()
  }));

// Mock de class-transformer
jest.mock('class-transformer', () => ({
  plainToClass: jest.fn(),
}));

// Mock del AuthService
jest.mock('../services/auth.service', () => {
  return {
    AuthService: jest.fn().mockImplementation(() => ({
      login: jest.fn()
    }))
  };
});

describe('AuthController', () => {
  let authController: AuthController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(() => {
    mockRequest = {
      body: {
        email: 'test@test.com',
        password: 'password123'
      }
    };

    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    authController = new AuthController();
    mockAuthService = (authController as any).authService;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    const mockLoginDto = {
      email: 'test@test.com',
      password: 'password123'
    };

    const mockLoginResponse = {
      token: 'mockToken123',
      user: {
        id: 1,
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        role: 'barber'
      }
    };

    it('debería realizar un login exitoso con credenciales válidas', async () => {
      (plainToClass as jest.Mock).mockReturnValue(mockLoginDto);
      (validate as jest.Mock).mockResolvedValue([]);
      mockAuthService.login.mockResolvedValue(mockLoginResponse);

      await authController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(plainToClass).toHaveBeenCalledWith(LoginDto, mockRequest.body);
      expect(validate).toHaveBeenCalledWith(mockLoginDto);
      expect(mockAuthService.login).toHaveBeenCalledWith(
        mockLoginDto.email,
        mockLoginDto.password
      );
      expect(mockResponse.json).toHaveBeenCalledWith(mockLoginResponse);
    });

    it('debería devolver error 400 cuando la validación falla', async () => {
      const validationErrors = [{
        property: 'email',
        constraints: {
          isEmail: 'email must be a valid email'
        }
      }];

      (plainToClass as jest.Mock).mockReturnValue(mockLoginDto);
      (validate as jest.Mock).mockResolvedValue(validationErrors);

      await authController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ errors: validationErrors });
      expect(mockAuthService.login).not.toHaveBeenCalled();
    });

    it('debería devolver error 401 cuando el servicio de autenticación falla', async () => {
      const errorMessage = 'Invalid credentials';
      
      (plainToClass as jest.Mock).mockReturnValue(mockLoginDto);
      (validate as jest.Mock).mockResolvedValue([]);
      mockAuthService.login.mockRejectedValue(new Error(errorMessage));

      await authController.login(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ message: errorMessage });
    });
  });
});