import { BarbershopService } from '../services/barbershop.service';  // Asegúrate de que la ruta sea correcta
import { AppDataSource } from '../../../config/database';  // Importa la configuración de la base de datos
import { Barbershop } from '../entities/barbershop.entity';  // Asegúrate de que las entidades estén bien importadas
import { StateBarbershop } from '../entities/state-barbershop.entity';  // IMPORTANTE: Importa StateBarbershop
import { User } from '../../auth/entities/user.entity';  // Importar la entidad User si es necesario

jest.mock('../../../config/database');  // Mockeamos el AppDataSource

describe('BarbershopService', () => {
  let service: BarbershopService;
  let barbershopRepository: any;
  let userRepository: any;
  let stateRepository: any;

  beforeEach(() => {
    // Creamos instancias mockeadas para los repositorios
    barbershopRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
      find: jest.fn(),
      delete: jest.fn(),
    };

    userRepository = {
      findOne: jest.fn(),
    };

    stateRepository = {
      findOne: jest.fn(),
    };

    // Mockeamos el repositorio para los métodos de BarbershopService
    AppDataSource.getRepository = jest.fn().mockImplementation((entity) => {
      if (entity === Barbershop) return barbershopRepository;
      if (entity === User) return userRepository;
      if (entity === StateBarbershop) return stateRepository;  // Mockeamos también StateBarbershop
    });

    service = new BarbershopService();  // Inicializamos el servicio
  });

  it('should be defined', () => {
    expect(service).toBeDefined();  // Verificamos que el servicio está definido
  });

  it('should create a barbershop', async () => {
    const mockUser = { id: 1, name: 'User A', email: 'user@example.com' };
    const mockState = { id: 2, name: 'Cerrado' };
    
    userRepository.findOne.mockResolvedValue(mockUser);  // Mockeamos la respuesta de findOne
    stateRepository.findOne.mockResolvedValue(mockState);  // Mockeamos la respuesta de findOne

    // Datos para crear la barbería
    const createBarbershopDto = { userId: 1, name: 'Barbería A', description: 'Descripción A', imageBanner: 'banner.jpg' };

    // Mockeamos la creación de la barbería
    barbershopRepository.create.mockReturnValue(createBarbershopDto);
    barbershopRepository.save.mockResolvedValue(createBarbershopDto);

    const result = await service.create(createBarbershopDto);  // Llamamos al método

    // Comprobamos que la barbería se creó correctamente
    expect(result).toEqual(createBarbershopDto);
    expect(barbershopRepository.create).toHaveBeenCalledWith({
      user: mockUser,
      state: mockState,
      name: createBarbershopDto.name,
      description: createBarbershopDto.description,
      imageBanner: createBarbershopDto.imageBanner,
    });
  });

  it('should return all barbershops', async () => {
    const mockBarbershops = [
      { id: 1, name: 'Barbería A', description: 'Descripción A' },
      { id: 2, name: 'Barbería B', description: 'Descripción B' }
    ];

    // Mockeamos la respuesta de find
    barbershopRepository.find.mockResolvedValue(mockBarbershops);

    const result = await service.getAll();  // Llamamos al método

    // Verificamos que devuelve todas las barberías correctamente
    expect(result).toEqual(mockBarbershops);
    expect(barbershopRepository.find).toHaveBeenCalled();
  });
});
