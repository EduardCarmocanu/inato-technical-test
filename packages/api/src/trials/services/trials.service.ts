import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TrialsRepository } from '../repositories/trials.repository';
import { CountryEnum } from '../enums/country.enum';
import { TrialModel } from '../models/trial.model';
import { TrailDTO } from '../dtos/ongoing-trials.dto';
import { TrailDTOMapper } from '../mappers/trial-dto.mapper';

@Injectable()
export class TrialsService {
    constructor(private trialsRepository: TrialsRepository, private ongoingTrialDTOMapper: TrailDTOMapper) { }

    public async getOngoingTrials(country?: CountryEnum, sponsor?: string): Promise<TrailDTO[]> {
        let trials: TrialModel[]

        try {
            trials = await this.trialsRepository.getTrials();
        } catch (e) {
            throw new InternalServerErrorException("Could not query data source");
        }

        trials = trials.filter((trial) => {
            const now = new Date();
            return !trial.canceled && trial.start_date < now && trial.end_date > now
        })

        if (country) {
            trials = trials.filter((trial) => trial.country === country)
        }

        if (sponsor) {
            trials = trials.filter((trial) => trial.sponsor === sponsor)
        }

        return trials.map(this.ongoingTrialDTOMapper.map);
    }
}
