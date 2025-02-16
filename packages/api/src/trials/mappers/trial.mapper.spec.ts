import { TrialMapper } from '../mappers/trial.mapper';
import { CountryEnum } from '../enums/country.enum';
import { IRawTrial } from '../interfaces/raw-trial.interface';

describe('TrialMapper', () => {
    let mapper: TrialMapper;
    const testRawTrial: IRawTrial = {
        "name": "Olaparib + Sapacitabine in BRCA Mutant Breast Cancer",
        "country": "FR",
        "start_date": "2019-01-01",
        "end_date": "2025-08-01",
        "sponsor": "Sanofi",
        "canceled": false,
        "study_type": "interventional",
        "primary_purpose": "treatment"
    }

    beforeEach(() => {
        mapper = new TrialMapper();
    })

    it('should be defined', () => {
        expect(mapper).toBeDefined();
    });

    describe('map', () => {
        it('should map a IRawTrail object to a Trail Model', () => {
            const result = mapper.map(testRawTrial);

            expect(result).toEqual(
                {
                    "name": "Olaparib + Sapacitabine in BRCA Mutant Breast Cancer",
                    "country": CountryEnum.FR,
                    "start_date": new Date("2019-01-01"),
                    "end_date": new Date("2025-08-01"),
                    "sponsor": "Sanofi",
                    "canceled": false,
                }
            )
        })
    })
});
