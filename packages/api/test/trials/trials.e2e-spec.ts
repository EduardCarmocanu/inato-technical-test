import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';
import { CountryEnum } from '../../src/trials/enums/country.enum';

describe('TrialsController (e2e)', () => {
    jest.mock('../../trials.json', () => ([
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
        },
        {
            "name": "Carboplatin +/- Nivolumab in Metastatic Triple Negative Breast Cancer",
            "country": "ES",
            "start_date": "2018-06-13",
            "end_date": "2025-07-17",
            "sponsor": "Sanofi",
            "canceled": true,
            "study_type": "interventional",
            "primary_purpose": "treatment"
        },
        {
            "name": "Neratinib +/- Fulvestrant in HER2+, ER+ Metastatic Breast Cancer",
            "country": "DE",
            "start_date": "2016-03-08",
            "end_date": "2026-10-10",
            "sponsor": "AstraZeneca",
            "canceled": false,
            "study_type": "interventional",
            "primary_purpose": "treatment"
        },
    ]))

    let app: INestApplication;

    beforeAll(() => {
        jest
            .useFakeTimers()
            .setSystemTime(new Date('2025-02-16'));
    })

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.useGlobalPipes(
            new ValidationPipe({ transform: true }),
        );
        await app.init();
    });

    describe('/trials/ongoing', () => {
        it('should return a list of ongoing trials', () => {
            return request(app.getHttpServer())
                .get('/trials/ongoing')
                .query({ country: 'FR', sponsor: 'Sanofi' })
                .expect(200)
                .expect([
                    {
                        name: "Olaparib + Sapacitabine in BRCA Mutant Breast Cancer",
                        end_date: "2025-08-01",
                        start_date: "2019-01-01",
                        sponsor: "Sanofi"
                    },
                    {
                        name: "Topical Calcipotriene Treatment for Breast Cancer Immunoprevention",
                        end_date: "2032-09-10",
                        start_date: "2018-03-20",
                        sponsor: "Sanofi"
                    }
                ])
        })

        it('should 400 (Bad Request) if country query param is not valid', () => {
            return request(app.getHttpServer())
                .get('/trials/ongoing')
                .query({ country: 'Wrong country code', sponsor: 'Sanofi' })
                .expect(400)
                .expect({
                    "message": [
                        `country must be one of the following values: ${Object.values(CountryEnum).join(', ')}`
                    ],
                    "error": "Bad Request",
                    "statusCode": 400
                })
        })
    })
});
