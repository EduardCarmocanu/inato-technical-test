import { CountryEnum } from '../enums/country.enum';
import { TrialModel } from '../models/trial.model';
import { TrialDTOMapper } from './trial-dto.mapper';

describe('TrialDTOMapper', () => {
    let mapper: TrialDTOMapper;
    const testRawTrial: TrialModel =  {
        "name": "Olaparib + Sapacitabine in BRCA Mutant Breast Cancer",
        "country": CountryEnum.FR,
        "start_date": new Date("2019-01-01"),
        "end_date": new Date("2025-08-01"),
        "sponsor": "Sanofi",
        "canceled": false,
    }

    beforeEach(() => {
        mapper = new TrialDTOMapper();
    })

    it('should be defined', () => {
        expect(mapper).toBeDefined();
    });

    describe('map', () => {
        it('should map a TrialModel object to a OngoingTrialDTO', () => {
            const result = mapper.map(testRawTrial);

            expect(result).toEqual(
                {
                    "name": "Olaparib + Sapacitabine in BRCA Mutant Breast Cancer",
                    "start_date": '2019-01-01',
                    "end_date": '2025-08-01',
                    "sponsor": "Sanofi",
                }
            )
        })
    })
});
