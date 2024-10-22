// src/config/jwt.config.test.ts
import jwt from 'jsonwebtoken';
import { generateToken, verifyToken, TokenPayload } from './jwt.config';

// Mock completo de jsonwebtoken
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn()
}));

describe('JWT Configuration', () => {
  const mockUserId = 1;
  const mockEmail = 'test@test.com';
  const mockRole = 'barber';
  const mockToken = 'mockToken123';

  beforeEach(() => {
    // Guardamos el JWT_SECRET original
    const originalSecret = process.env.JWT_SECRET;
    
    // Limpiamos los mocks antes de cada prueba
    jest.clearAllMocks();
    
    // Configuramos los mocks
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);
    process.env.JWT_SECRET = originalSecret || 'test-secret';
  });

  describe('generateToken', () => {
    it('should generate a token with correct payload', () => {
      const token = generateToken(mockUserId, mockEmail, mockRole);

      const expectedPayload = {
        id: mockUserId,
        email: mockEmail,
        role: mockRole
      };

      expect(jwt.sign).toHaveBeenCalledWith(
        expectedPayload,
        expect.any(String),
        { expiresIn: expect.any(String) }
      );
      expect(token).toBe(mockToken);
    });
  });

  describe('verifyToken', () => {
    const mockPayload: TokenPayload = {
      id: mockUserId,
      email: mockEmail,
      role: mockRole
    };

    it('should verify and return token payload when token is valid', () => {
      (jwt.verify as jest.Mock).mockReturnValue(mockPayload);

      const result = verifyToken(mockToken);

      expect(jwt.verify).toHaveBeenCalledWith(
        mockToken,
        expect.any(String)
      );
      expect(result).toEqual(mockPayload);
    });

    it('should throw error when token verification fails', () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Token verification failed');
      });

      expect(() => verifyToken(mockToken)).toThrow('Token verification failed');
    });
  });
});