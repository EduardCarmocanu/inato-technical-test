import { Controller, Get, Query } from '@nestjs/common';
import { OngoingTrialQueryDto } from 'src/trials/dtos/ongoing-trials-query.dto';
import { OngoingTrialDTO } from 'src/trials/dtos/ongoing-trials.dto';
import { TrialsService } from 'src/trials/services/trials.service';

@Controller('trials')
export class TrialsController {
    constructor(private trialsService: TrialsService) { }

    @Get('/ongoing')
    public async getOngoingTrials(@Query() query?: OngoingTrialQueryDto): Promise<OngoingTrialDTO[]> {
        return await this.trialsService.getOngoingTrials(query.country, query.sponsor)
    }
}
