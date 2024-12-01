import request from 'supertest';
import express from 'express';
import { BarbershopController } from '../controllers/barbershop.controller';
import { BarbershopService } from '../services/barbershop.service';
import { CreateBarbershopDto } from '../dtos/create-barbershop.dto';

// Mock del BarbershopService
jest.mock('../services/barbershop.service');
const mockCreate = jest.fn();

describe('BarbershopController', () => {
    let app: express.Application;
    let controller: BarbershopController;

    beforeAll(() => {
        app = express();
        controller = new BarbershopController();
        app.use(express.json());

        // Definimos las rutas del controlador
        app.post('/barbershops', controller.create);
        app.put('/barbershops/:id', controller.update);
        app.get('/barbershops/:id', controller.getById);
        app.get('/barbershops', controller.getAll);
        app.delete('/barbershops/:id', controller.delete);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new barbershop successfully', async () => {
        // Mock de las entidades necesarias para crear una barbería
        const mockBarberStatus = {
            id: 1,
            name: 'Activo',
            created_at: new Date(),
            updated_at: new Date(),
        };

        const mockUser = {
            id: 1,
            email: 'juan.perez@example.com',
            password: 'password123',
            barberState: mockBarberStatus, // Relación con el estado de la barbería
            userRoles: ['admin'],
            created_at: new Date(),
            updated_at: new Date(),
        };

        const mockStateBarbershop = {
            id: 1,
            name: 'Activo',
            created_at: new Date(),
            updated_at: new Date(),
        };

        const mockBarbershopService = {
            id: 1,
            name: 'Corte de pelo',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const createBarbershopDto: CreateBarbershopDto = {
            userId: 1,
            name: 'Barbershop Example',
            description: 'Una barbería ejemplo',
            imageBanner: 'https://example.com/banner.jpg',
        };

        // Mockea la función create() para que retorne un valor simulado
        mockCreate.mockResolvedValueOnce({
            id: 1,
            userId: 1,
            name: 'Barbershop Example',
            description: 'Una barbería ejemplo',
            imageBanner: 'https://example.com/banner.jpg',
            user: mockUser,  // Usamos el mock del usuario
            state: mockStateBarbershop,  // Usamos un mock para el estado de la barbería
            services: [mockBarbershopService],  // Usamos un mock para los servicios
            barbers: [{ id: 1, name: 'Juan Pérez' }],  // Mock de los barberos
            schedules: [{ id: 1, startHour: '09:00', endHour: '18:00' }],  // Mock de horarios
            products: ['Shampoo', 'Afeitadora'],  // Mock de productos
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // Reemplazar el mock de create dentro del servicio BarbershopService
        BarbershopService.prototype.create = mockCreate;

        const response = await request(app)
            .post('/barbershops')
            .send(createBarbershopDto);

        expect(response.status).toBe(201);
        expect(response.body.name).toBe(createBarbershopDto.name);
        expect(mockCreate).toHaveBeenCalledWith(createBarbershopDto);
    });

    it('should return 400 when validation fails during create', async () => {
        const invalidBarbershopDto = { name: '', description: '', imageBanner: '' };

        const response = await request(app)
            .post('/barbershops')
            .send(invalidBarbershopDto);

        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should handle errors gracefully when creating a barbershop', async () => {
        // Mockea la función create() para que falle y retorne un error
        mockCreate.mockRejectedValueOnce(new Error('Error al crear la barbería'));

        const response = await request(app)
            .post('/barbershops')
            .send({ name: 'Faulty Barbershop', userId: 1, description: 'Faulty description', imageBanner: 'https://example.com/banner.jpg' });

        expect(response.status).toBe(500);
        expect(response.body.message).toBe('Error al crear la barbería');
    });

    it('should delete a barbershop successfully', async () => {
        // Mockea la función delete() para que se resuelva correctamente sin valor
        mockCreate.mockResolvedValueOnce(undefined);

        const response = await request(app).delete('/barbershops/1');

        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Barbería eliminada exitosamente');
        expect(mockCreate).toHaveBeenCalledWith(1);
    });
});
