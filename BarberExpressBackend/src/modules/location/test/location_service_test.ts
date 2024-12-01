import { LocationService } from '../services/location.service';
import { AppDataSource } from '../../../config/database';
import { Country } from '../entities/country.entity';
import { Department } from '../entities/department.entity';

jest.mock('../../../config/database');

describe('LocationService', () => {
    let locationService: LocationService;
    let mockCountryRepository: jest.Mocked<any>;
    let mockDepartmentRepository: jest.Mocked<any>;

    beforeEach(() => {
        mockCountryRepository = {
            find: jest.fn()
        };
        mockDepartmentRepository = {
            find: jest.fn()
        };

        (AppDataSource.getRepository as jest.Mock).mockImplementation((entity) => {
            if (entity === Country) return mockCountryRepository;
            if (entity === Department) return mockDepartmentRepository;
        });

        locationService = new LocationService();
    });

    it('should return location data successfully', async () => {
        const mockCountries: Country[] = [{ id: 1, name: 'Country1', departments: [] }];
        const mockDepartments: Department[] = [{ id: 1, name: 'Department1', country: mockCountries[0] }];
        mockCountries[0].departments = mockDepartments;

        mockCountryRepository.find.mockResolvedValue(mockCountries);
        mockDepartmentRepository.find.mockResolvedValue(mockDepartments);

        const result = await locationService.getLocationData();

        expect(result).toEqual({
            countries: mockCountries,
            departments: mockDepartments
        });
    });

    it('should handle errors', async () => {
        mockCountryRepository.find.mockRejectedValue(new Error('Failed to fetch countries'));
        mockDepartmentRepository.find.mockResolvedValue([]);

        await expect(locationService.getLocationData()).rejects.toThrow('Failed to fetch countries');
    });
});