import { Module } from '@nestjs/common';
import { TrialsService } from './services/trials.service';
import { TrialsRepository } from './repositories/trials.repository';
import { TrialsController } from './controllers/trials.controller';
import { TrialMapper } from './mappers/trial.mapper';
import { OngoingTrailDTOMapper } from './mappers/ongoing-trial-dto.mapper';

@Module({
    controllers: [TrialsController],
    providers: [TrialsService, TrialsRepository, TrialMapper, OngoingTrailDTOMapper]
})
export class TrialsModule {}
