// src/modules/states/services/state.service.ts
import { AppDataSource } from '../../../config/database';
import { State } from '../entities/state.entity';

export class StateService {
    private stateRepository = AppDataSource.getRepository(State);

    async getStatesByCountry(countryId: number) {
        return this.stateRepository.find({
            where: { country_id: countryId },
        });
    }
}