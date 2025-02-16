import { Controller, Get, Query } from '@nestjs/common';
import { TrialsService } from '../services/trials.service';
import { OngoingTrialQueryDto } from '../dtos/ongoing-trials-query.dto';
import { TrialDTO } from '../dtos/ongoing-trials.dto';

@Controller('trials')
export class TrialsController {
    constructor(private trialsService: TrialsService) { }

    @Get('/ongoing')
    public async getOngoingTrials(@Query() query?: OngoingTrialQueryDto): Promise<TrialDTO[]> {
        return await this.trialsService.getOngoingTrials(query.country, query.sponsor)
    }
}
