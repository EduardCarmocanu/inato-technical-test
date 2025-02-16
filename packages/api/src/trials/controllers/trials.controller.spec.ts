import { Test, TestingModule } from '@nestjs/testing';
import { TrialsController } from './trials.controller';
import { TrialsService } from '../services/trials.service';
import { CountryEnum } from '../enums/country.enum';
import { TrialDTO } from '../dtos/ongoing-trials.dto';

describe('TrialsController', () => {
  let controller: TrialsController;
  const testTrialDTOList: TrialDTO[] = [{
    name: 'Trial 1',
    start_date: '2022-10-01',
    end_date: '2026-01-01',
    sponsor: 'Sponsor 1'
  }]
  let getOngoingTrialsMock;

  beforeEach(async () => {
    getOngoingTrialsMock = jest.fn(() => Promise.resolve(testTrialDTOList))

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrialsController],
      providers: [{
        provide: TrialsService,
        useValue: {
          getOngoingTrials: getOngoingTrialsMock
        }
      }]
    }).compile();

    controller = module.get<TrialsController>(TrialsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOngoingTrials', () => {
    it('should return a list of ongoing trials', async () => {
      const result = await controller.getOngoingTrials({ country: CountryEnum.FR, sponsor: 'Sponsor 1' })

      expect(result).toEqual(testTrialDTOList)
      expect(getOngoingTrialsMock).toHaveBeenCalledWith(CountryEnum.FR, 'Sponsor 1')
    })
  })
});
