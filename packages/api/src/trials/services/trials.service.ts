import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { OngoingTrialDTO } from 'src/trials/dtos/ongoing-trials.dto';
import { CountryEnum } from 'src/trials/enums/country.enum';
import { OngoingTrailDTOMapper } from 'src/trials/mappers/ongoing-trial-dto.mapper';
import { TrialModel } from 'src/trials/models/trial.model';
import { TrialsRepository } from 'src/trials/repositories/trials.repository';

@Injectable()
export class TrialsService {
    constructor(private trialsRepository: TrialsRepository, private ongoingTrialDTOMapper: OngoingTrailDTOMapper) { }

    public async getOngoingTrials(country?: CountryEnum, sponsor?: string): Promise<OngoingTrialDTO[]> {
        let trials: TrialModel[]

        try {
            trials = await this.trialsRepository.getTrials();
        } catch (e) {
            throw new InternalServerErrorException("Could not query data file");
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
