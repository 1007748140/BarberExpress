// src/modules/auth/services/auth.service.ts
import bcrypt from 'bcrypt';
import { AppDataSource } from '../../../config/database';
import { User } from '../entities/user.entity';
import { generateToken } from '../../../config/jwt.config';
import { RegisterDto } from '../dtos/register.dto';
import { UserRole } from '../entities/user-role.entity';
import { Role } from '../entities/role.entity';
import { Profile } from '../../profiles/entities/profile.entity';
import { UserLocation } from '../../user-info/entities/user-location.entity';
import { Country } from '../../location/entities/country.entity';
import { Department } from '../../location/entities/department.entity';
import { BarberStatus } from '../entities/barber-status.entity';

export class AuthService {
    private userRepository = AppDataSource.getRepository(User);
    private roleRepository = AppDataSource.getRepository(Role);
    private barberStatusRepository = AppDataSource.getRepository(BarberStatus);
    private countryRepository = AppDataSource.getRepository(Country);
    private departmentRepository = AppDataSource.getRepository(Department);

    async login(email: string, password: string) {
        try {
            const user = await this.userRepository.findOne({
                where: { email },
                relations: ['userRoles', 'userRoles.role', 'barberState']
            });

            if (!user) {
                throw new Error('Usuario no encontrado');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                throw new Error('Contraseña inválida');
            }

            const roles = user.userRoles.map(userRole => userRole.role.name);

            const token = generateToken(
                user.id,
                user.email,
                roles
            );

            return {
                success: true,
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    roles: roles,
                    barber_state: user.barberState,
                    created_at: user.created_at,
                    updated_at: user.updated_at
                }
            };
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Error en el proceso de login');
        }
    }

    async register(registerDto: RegisterDto) {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Verificar si el email ya existe
            const existingUser = await this.userRepository.findOne({
                where: { email: registerDto.email }
            });

            if (existingUser) {
                throw new Error('El email ya está registrado');
            }

            // Validar el rol
            if (!['Cliente', 'Barbero', 'AdminBarberia'].includes(registerDto.role)) {
                throw new Error('Rol no válido');
            }

            // Determinar el estado del barbero según el rol
            let barberStateId: number;
            switch (registerDto.role) {
                case 'Barbero':
                    barberStateId = 1; // Disponible
                    break;
                case 'AdminBarberia':
                    barberStateId = 3; // En descanso (o el estado que corresponda para admin)
                    break;
                default:
                    barberStateId = 3; // Estado por defecto para clientes
            }

            // Obtener estado del barbero
            const barberState = await this.barberStatusRepository.findOne({
                where: { id: barberStateId }
            });

            if (!barberState) {
                throw new Error('Estado de barbero no encontrado');
            }

            // Obtener rol
            const role = await this.roleRepository.findOne({
                where: { name: registerDto.role }
            });

            if (!role) {
                throw new Error('Rol no encontrado');
            }

            // Obtener país y departamento
            const country = await this.countryRepository.findOne({
                where: { id: registerDto.countryId }
            });

            if (!country) {
                throw new Error('País no encontrado');
            }

            const department = await this.departmentRepository.findOne({
                where: { id: registerDto.departmentId }
            });

            if (!department) {
                throw new Error('Departamento no encontrado');
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(registerDto.password, 10);

            // Crear usuario
            const user = this.userRepository.create({
                email: registerDto.email,
                password: hashedPassword,
                barberState: barberState
            });

            const savedUser = await queryRunner.manager.save(user);

            // Crear rol de usuario
            const userRole = queryRunner.manager.create(UserRole, {
                user: savedUser,
                role: role
            });
            await queryRunner.manager.save(userRole);

            // Crear perfil
            const profile = queryRunner.manager.create(Profile, {
                user: savedUser,
                firstName: registerDto.firstName,
                lastName: registerDto.lastName,
                phone: registerDto.phone,
                profileImage: registerDto.profileImage
            });
            await queryRunner.manager.save(profile);

            // Crear ubicación
            const location = queryRunner.manager.create(UserLocation, {
                user: savedUser,
                country: country,
                department: department,
                latitude: registerDto.latitude,
                longitude: registerDto.longitude
            });
            await queryRunner.manager.save(location);

            await queryRunner.commitTransaction();

            // Generar token
            const token = generateToken(
                savedUser.id,
                savedUser.email,
                [role.name]
            );

            return {
                success: true,
                token,
                user: {
                    id: savedUser.id,
                    email: savedUser.email,
                    roles: [role.name],
                    barber_state: savedUser.barberState,
                    created_at: savedUser.created_at,
                    updated_at: savedUser.updated_at
                }
            };

        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}