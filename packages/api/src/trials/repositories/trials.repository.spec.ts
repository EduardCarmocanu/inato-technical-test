import { Test, TestingModule } from '@nestjs/testing';
import { TrialsRepository } from '../repositories/trials.repository';
import { TrialMapper } from '../mappers/trial.mapper';
import { CountryEnum } from '../enums/country.enum';

jest.mock('../../../trials.json', () => ([
    {
        "name": "Olaparib + Sapacitabine in BRCA Mutant Breast Cancer",
        "country": "FR",
        "start_date": "2019-01-01",
        "end_date": "2025-08-01",
        "sponsor": "Sanofi",
        "canceled": false,
        "study_type": "interventional",
        "primary_purpose": "treatment"
    },
    {
        "name": "Topical Calcipotriene Treatment for Breast Cancer Immunoprevention",
        "country": "fr",
        "start_date": "2018-03-20",
        "end_date": "2032-09-10",
        "sponsor": "Sanofi",
        "canceled": false,
        "study_type": "interventional",
        "primary_purpose": "treatment"
    }
]))

describe('TrialsRepository', () => {
    let repository: TrialsRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TrialMapper,
                TrialsRepository
            ],
        }).compile();

        repository = module.get<TrialsRepository>(TrialsRepository);
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('getTrials', () => {
        it('should return a list of trials', async () => {
            const result = await repository.getTrials();

            expect(result).toEqual([
                {
                    "name": "Olaparib + Sapacitabine in BRCA Mutant Breast Cancer",
                    "country": CountryEnum.FR,
                    "start_date": new Date("2019-01-01"),
                    "end_date": new Date("2025-08-01"),
                    "sponsor": "Sanofi",
                    "canceled": false,
                },
                {
                    "name": "Topical Calcipotriene Treatment for Breast Cancer Immunoprevention",
                    "country": CountryEnum.FR,
                    "start_date": new Date("2018-03-20"),
                    "end_date": new Date("2032-09-10"),
                    "sponsor": "Sanofi",
                    "canceled": false,
                },
            ])
        })
    })
});
