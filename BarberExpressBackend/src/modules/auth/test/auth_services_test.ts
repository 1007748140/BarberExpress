// src/modules/auth/services/auth.service.spec.ts
import { AuthService } from '../services/auth.service';
import { AppDataSource } from '../../../config/database';
import { User } from '../entities/user.entity';
import { RegisterDto } from '../dtos/register.dto';
import bcrypt from 'bcrypt';
import { generateToken } from '../../../config/jwt.config';

jest.mock('bcrypt');
jest.mock('../../../config/jwt.config');

describe('AuthService', () => {
    let authService: AuthService;
    let userRepositoryMock: any;

    beforeEach(() => {
        authService = new AuthService();
        userRepositoryMock = {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
        };
        authService['userRepository'] = userRepositoryMock; // Reemplazar el repositorio real por el mock
    });

    describe('login', () => {
        it('should return a token and user data for valid credentials', async () => {
            const email = 'test@example.com';
            const password = 'testPassword';
            const user = {
                id: 1,
                email,
                password: await bcrypt.hash(password, 10),
                userRoles: [{ role: { name: 'Cliente' } }],
                barberState: null,
                created_at: new Date(),
                updated_at: new Date(),
            };

            userRepositoryMock.findOne.mockResolvedValue(user);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (generateToken as jest.Mock).mockReturnValue('token');

            const result = await authService.login(email, password);

            expect(result).toEqual({
                success: true,
                token: 'token',
                user: {
                    id: user.id,
                    email: user.email,
                    roles: ['Cliente'],
                    barber_state: user.barberState,
                    created_at: user.created_at,
                    updated_at: user.updated_at,
                },
            });
        });

        it('should throw an error if user is not found', async () => {
            const email = 'notfound@example.com';
            const password = 'testPassword';

            userRepositoryMock.findOne.mockResolvedValue(null);

            await expect(authService.login(email, password)).rejects.toThrow('Usuario no encontrado');
        });

        it('should throw an error if password is invalid', async () => {
            const email = 'test@example.com';
            const password = 'wrongPassword';
            const user = {
                id: 1,
                email,
                password: await bcrypt.hash('correctPassword', 10),
                userRoles: [{ role: { name: 'Cliente' } }],
                barberState: null,
                created_at: new Date(),
                updated_at: new Date(),
            };

            userRepositoryMock.findOne.mockResolvedValue(user);
            (bcrypt.compare as jest.Mock).mockResolvedValue(false);

            await expect(authService.login(email, password)).rejects.toThrow('Contraseña inválida');
        });
    });

    describe('register', () => {
        it('should successfully register a new user', async () => {
            const registerDto: RegisterDto = {
                email: 'newuser@example.com',
                password: 'newPassword',
                role: 'Cliente',
                firstName: 'New',
                lastName: 'User ',
                phone: '123456789',
                profileImage: 'image_url',
                countryId: 1,
                departmentId: 1,
                latitude: 0,
                longitude: 0,
            };

            // Mock de los repositorios
            userRepositoryMock.findOne.mockResolvedValue(null); // No existe el usuario
            userRepositoryMock.create.mockReturnValue(registerDto);
            userRepositoryMock.save.mockResolvedValue({ ...registerDto, id: 1 });

            (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
            (generateToken as jest.Mock).mockReturnValue('token');

            const result = await authService.register(registerDto);

            expect(result).toEqual({
                success: true,
                token: 'token',
                user: {
                    id: 1,
                    email: registerDto.email,
                    roles: ['Cliente'],
                    barber_state: null ,
                    created_at: expect.any(Date),
                    updated_at: expect.any(Date),
                },
            });
        });

        it('should throw an error if the email is already registered', async () => {
            const registerDto: RegisterDto = {
                email: 'existinguser@example.com',
                password: 'password',
                role: 'Cliente',
                firstName: 'Existing',
                lastName: 'User ',
                phone: '987654321',
                profileImage: 'image_url',
                countryId: 1,
                departmentId: 1,
                latitude: 0,
                longitude: 0,
            };

            userRepositoryMock.findOne.mockResolvedValue({}); // Simulando que el usuario ya existe

            await expect(authService.register(registerDto)).rejects.toThrow('El email ya está registrado');
        });

        it('should throw an error if the role is invalid', async () => {
            const registerDto: RegisterDto = {
                email: 'newuser@example.com',
                password: 'newPassword',
                role: 'InvalidRole', // Rol no válido
                firstName: 'New',
                lastName: 'User ',
                phone: '123456789',
                profileImage: 'image_url',
                countryId: 1,
                departmentId: 1,
                latitude: 0,
                longitude: 0,
            };

            await expect(authService.register(registerDto)).rejects.toThrow('Rol no válido');
        });
    });
});