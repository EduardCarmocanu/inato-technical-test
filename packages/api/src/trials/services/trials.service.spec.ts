import { Test, TestingModule } from '@nestjs/testing';
import { TrialsService } from './trials.service';
import { TrialsRepository } from '../repositories/trials.repository';
import { CountryEnum } from '../enums/country.enum';
import { OngoingTrailDTOMapper } from '../mappers/ongoing-trial-dto.mapper';
import { TrialMapper } from '../mappers/trial.mapper';
import { TrialModel } from '../models/trial.model';

describe('TrialsService', () => {
  const testTrials: TrialModel[] = [
    {
      "name": "Trial 1",
      "country": CountryEnum.FR,
      "start_date": new Date("2018-03-20"),
      "end_date": new Date("2032-09-10"),
      "sponsor": "Sponsor 1",
      "canceled": false,
    },
    {
      "name": "Trial 2",
      "country": CountryEnum.FR,
      "start_date": new Date("2019-01-01"),
      "end_date": new Date("2025-08-01"),
      "sponsor": "Sponsor 1",
      "canceled": false,
    },
    {
      "name": "Trial 3",
      "country": CountryEnum.ES,
      "start_date": new Date("2018-06-13"),
      "end_date": new Date("2025-07-17"),
      "sponsor": "Sponsor 2",
      "canceled": false,
    },
    {
      "name": "Trial 4",
      "country": CountryEnum.ES,
      "start_date": new Date("2022-06-15"),
      "end_date": new Date("2030-12-24"),
      "sponsor": "Sponsor 2",
      "canceled": true,
    },
  ]

  let service: TrialsService;

  beforeAll(() => {
    jest
      .useFakeTimers()
      .setSystemTime(new Date('2025-02-16'));
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrialsService,
        OngoingTrailDTOMapper,
        TrialMapper,
        {
          provide: TrialsRepository,
          useValue: {
            getTrials: () => Promise.resolve(testTrials)
          }
        },
      ],
    }).compile();

    service = module.get<TrialsService>(TrialsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getOngoingTrials', () => {
    it('should return ongoing list of trials by country', async () => {
      const resultFrance = await service.getOngoingTrials(CountryEnum.FR);
      const resultSpain = await service.getOngoingTrials(CountryEnum.ES);

      expect(resultFrance).toEqual([
        {
          name: 'Trial 1',
          start_date: '2018-03-20',
          end_date: '2032-09-10',
          sponsor: 'Sponsor 1'
        },
        {
          name: 'Trial 2',
          start_date: "2019-01-01",
          end_date: "2025-08-01",
          sponsor: 'Sponsor 1'
        },
      ])

      expect(resultSpain).toEqual([
        {
          "name": "Trial 3",
          "start_date": "2018-06-13",
          "end_date": "2025-07-17",
          "sponsor": "Sponsor 2",
        }
      ])
    })

    it('should return ongoing trials by sponsor', async () => {
      const resultSponsor1 = await service.getOngoingTrials(undefined, 'Sponsor 1');
      const resultSponsor2 = await service.getOngoingTrials(undefined, 'Sponsor 2');

      expect(resultSponsor1).toEqual([
        {
          name: 'Trial 1',
          start_date: '2018-03-20',
          end_date: '2032-09-10',
          sponsor: 'Sponsor 1'
        },
        {
          name: 'Trial 2',
          start_date: "2019-01-01",
          end_date: "2025-08-01",
          sponsor: 'Sponsor 1'
        },
      ])

      expect(resultSponsor2).toEqual([
        {
          "name": "Trial 3",
          "start_date": "2018-06-13",
          "end_date": "2025-07-17",
          "sponsor": "Sponsor 2",
        }
      ])
    })
  })
});
