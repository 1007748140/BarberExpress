import { LocationController } from '../controllers/location.controller';
import { LocationService } from '../services/location.service';
import { Request, Response } from 'express';
import { Country } from '../entities/country.entity';
import { Department } from '../entities/department.entity';

jest.mock('../services/location.service');

describe('LocationController', () => {
    let locationController: LocationController;
    let mockLocationService: jest.Mocked<LocationService>;
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;

    beforeEach(() => {
        mockLocationService = new LocationService() as jest.Mocked<LocationService>;
        locationController = new LocationController();
        locationController['locationService'] = mockLocationService;

        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    describe('getLocationData', () => {
        it('should return location data successfully', async () => {
            const country: Country = { id: 1, name: 'Country1', departments: [] };
            const department: Department = { id: 1, name: 'Department1', country };
            country.departments = [department];
            const locationData = { countries: [country], departments: [department] };
            mockLocationService.getLocationData.mockResolvedValue(locationData);

            await locationController.getLocationData(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.json).toHaveBeenCalledWith(locationData);
        });

        it('should handle errors when getting location data', async () => {
            const errorMessage = 'Error al obtener datos de ubicación';
            mockLocationService.getLocationData.mockRejectedValue(new Error(errorMessage));

            await locationController.getLocationData(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({
                message: 'Error al obtener datos de ubicación',
                error: errorMessage
            });
        });
    });
});