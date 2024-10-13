// src/modules/countries/services/country.service.ts
import { AppDataSource } from '../../../config/database';
import { Country } from '../entities/country.entity';

export class CountryService {
    private countryRepository = AppDataSource.getRepository(Country);

    async getCountries() {
        return this.countryRepository.find();
    }
}