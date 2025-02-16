import { CountryEnum } from '../enums/country.enum';
import { TrialModel } from '../models/trial.model';
import { TrailDTOMapper } from './trial-dto.mapper';

describe('TrailDTOMapper', () => {
    let mapper: TrailDTOMapper;
    const testRawTrial: TrialModel =  {
        "name": "Olaparib + Sapacitabine in BRCA Mutant Breast Cancer",
        "country": CountryEnum.FR,
        "start_date": new Date("2019-01-01"),
        "end_date": new Date("2025-08-01"),
        "sponsor": "Sanofi",
        "canceled": false,
    }

    beforeEach(() => {
        mapper = new TrailDTOMapper();
    })

    it('should be defined', () => {
        expect(mapper).toBeDefined();
    });

    describe('map', () => {
        it('should map a TrailModel object to a OngoingTrailDTO', () => {
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
