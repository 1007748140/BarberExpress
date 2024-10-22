// src/middlewares/auth.middleware.test.ts
import { Response, NextFunction } from 'express';
import { authMiddleware, AuthenticatedRequest } from './auth.middleware';
import * as jwtConfig from '../config/jwt.config';



// Mock del módulo jwt.config
jest.mock('../config/jwt.config', () => ({
  verifyToken: jest.fn()
}));

describe('Middleware de autenticación', () => {
  let mockRequest: Partial<AuthenticatedRequest>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Debería devolver 401 si no hay ningún encabezado de autorización presente', () => {
    authMiddleware(
      mockRequest as AuthenticatedRequest,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Authorization header must start with Bearer'
    });
  });

  it('Debería devolver 401 si el encabezado de autorización no comienza con Bearer', () => {
    mockRequest.headers = {
      authorization: 'Basic token123'
    };

    authMiddleware(
      mockRequest as AuthenticatedRequest,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Authorization header must start with Bearer'
    });
  });

  it('Debería llamar a next() y configurar el usuario si el token es válido', () => {
    const mockUser = {
      id: 1,
      email: 'test@test.com',
      role: 'barber'
    };

    mockRequest.headers = {
      authorization: 'Bearer validToken123'
    };

    (jwtConfig.verifyToken as jest.Mock).mockReturnValue(mockUser);

    authMiddleware(
      mockRequest as AuthenticatedRequest,
      mockResponse as Response,
      nextFunction
    );

    expect(jwtConfig.verifyToken).toHaveBeenCalledWith('validToken123');
    expect(mockRequest.user).toEqual(mockUser);
    expect(nextFunction).toHaveBeenCalled();
  });

  it('Debería devolver 401 si falla la verificación del token', () => {
    mockRequest.headers = {
      authorization: 'Bearer invalidToken'
    };

    (jwtConfig.verifyToken as jest.Mock).mockImplementation(() => {
      throw new Error('Token verification failed');
    });

    authMiddleware(
      mockRequest as AuthenticatedRequest,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: false,
      message: 'Invalid or expired token',
      error: 'Token verification failed'
    });
  });
});