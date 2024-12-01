import { AuthService } from '../auth.service'; // Asegúrate de importar correctamente el servicio.
import bcrypt from 'bcrypt'; // Para bcrypt
import { User } from '../../entities/user.entity'; // Asegúrate de que las rutas estén correctas
import { UserRepository } from '../../../repositories/user.repository'; // Importa el repositorio de usuario
import { generateToken } from '../../../config/jwt.config'; // Si estás usando esta función para generar tokens

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true), // Mock de bcrypt.compare, lo que resuelve como true
  hash: jest.fn().mockResolvedValue('hashedpassword'), // Mock de bcrypt.hash, lo que resuelve con un "hashedpassword"
}));

// Mockeamos las dependencias necesarias, como el repositorio de usuarios
jest.mock('../../../repositories/user.repository', () => ({
  UserRepository: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

// Mock de la función generateToken
jest.mock('../../../config/jwt.config', () => ({
  generateToken: jest.fn().mockReturnValue('mock-jwt-token'),
}));

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService(); // Inicializamos el servicio
  });

  describe('login', () => {
    it('should login successfully and return a token', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedpassword',
        userRoles: [{ role: { name: 'Barbero' } }],
        barberState: 'Disponible',
        created_at: new Date(),
        updated_at: new Date(),
      };

      // Mockeamos el comportamiento del repositorio de usuario
      UserRepository.findOne.mockResolvedValue(mockUser);

      // Forzamos el tipo para que jest reconozca el mock como una promesa
      (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Aseguramos que bcrypt compare devuelve true

      const response = await authService.login('test@example.com', 'password123');

      expect(response.success).toBe(true);
      expect(response.token).toBe('mock-jwt-token');
      expect(response.user.email).toBe('test@example.com');
      expect(response.user.roles).toEqual(['Barbero']);
    });

    it('should throw error when user not found', async () => {
      UserRepository.findOne.mockResolvedValue(null); // Simulamos que el usuario no existe

      await expect(authService.login('invalid@example.com', 'password123'))
        .rejects
        .toThrow('Usuario no encontrado');
    });

    it('should throw error when password is invalid', async () => {
      const mockUser = { password: 'hashedpassword' };
      UserRepository.findOne.mockResolvedValue(mockUser);

      // Simulamos que la contraseña es incorrecta
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(authService.login('test@example.com', 'wrongpassword'))
        .rejects
        .toThrow('Contraseña inválida');
    });
  });

  describe('register', () => {
    it('should register a new user successfully', async () => {
      const registerDto = {
        email: 'newuser@example.com',
        password: 'password123',
        role: 'Barbero',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123456789',
        profileImage: 'profile.jpg',
        latitude: 40.7128,
        longitude: -74.0060,
        countryId: 1,
        departmentId: 1,
      };

      const mockUser = {
        id: 1,
        email: 'newuser@example.com',
        password: 'hashedpassword',
        userRoles: [{ role: { name: 'Barbero' } }],
        barberState: 'Disponible',
        created_at: new Date(),
        updated_at: new Date(),
      };

      const mockRole = { name: 'Barbero' };
      const mockBarberStatus = { id: 1, name: 'Disponible' };
      const mockCountry = { id: 1, name: 'Colombia' };
      const mockDepartment = { id: 1, name: 'Cundinamarca' };

      // Mock de los repositorios de User, Role, BarberStatus, Country y Department
      UserRepository.findOne.mockResolvedValue(null); // No existe un usuario con este email
      UserRepository.create.mockReturnValue(mockUser);

      // Mock de las otras dependencias (roles, barberState, country, department)
      // Puedes extender esto para cubrir más casos
      jest.spyOn(authService, 'getRole').mockResolvedValue(mockRole);
      jest.spyOn(authService, 'getBarberState').mockResolvedValue(mockBarberStatus);
      jest.spyOn(authService, 'getCountry').mockResolvedValue(mockCountry);
      jest.spyOn(authService, 'getDepartment').mockResolvedValue(mockDepartment);

      // Hash de la contraseña (simulamos que bcrypt.hash funciona)
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedpassword');

      const response = await authService.register(registerDto);

      expect(response.success).toBe(true);
      expect(response.token).toBe('mock-jwt-token');
      expect(response.user.email).toBe('newuser@example.com');
    });

    it('should throw error if email is already registered', async () => {
      const registerDto = {
        email: 'existinguser@example.com',
        password: 'password123',
        role: 'Barbero',
        firstName: 'John',
        lastName: 'Doe',
        phone: '123456789',
        profileImage: 'profile.jpg',
        latitude: 40.7128,
        longitude: -74.0060,
        countryId: 1,
        departmentId: 1,
      };

      // Simulamos que ya existe un usuario con el mismo email
      UserRepository.findOne.mockResolvedValue({
        email: 'existinguser@example.com',
        password: 'hashedpassword',
      });

      await expect(authService.register(registerDto))
        .rejects
        .toThrow('El email ya está registrado');
    });

    // Puedes agregar más pruebas para el caso de roles inválidos, errores en el proceso de registro, etc.
  });
});
