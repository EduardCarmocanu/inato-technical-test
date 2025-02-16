import { describe, expect, it, jest } from '@jest/globals';
import { trialsRepository } from './trials.repository';

describe('trialsRepository', () => {
    const testTrials = [
        {
            "name": "Olaparib + Sapacitabine in BRCA Mutant Breast Cancer",
            "start_date": "2019-01-01",
            "end_date": "2025-08-01",
            "sponsor": "Sanofi",
        },
        {
            "name": "Topical Calcipotriene Treatment for Breast Cancer Immunoprevention",
            "start_date": "2018-03-20",
            "end_date": "2032-09-10",
            "sponsor": "Sanofi",
        }
    ]

    const repository = trialsRepository();

    describe('getOngoingTrials', () => {
        it('should return a list of trials', async () => {
            jest.spyOn(global, 'fetch').mockImplementationOnce(() => (Promise.resolve({
                text: () => Promise.resolve(JSON.stringify(testTrials))
            }) as Promise<Response>))

            const result = await repository.getOngoingTrials('FR');

            expect(global.fetch).toHaveBeenCalledWith(new URL('http://localhost:3000/trials/ongoing?country=FR'))
            expect(result).toEqual(testTrials);
        })

        it('should throw an error if it cannot retrieve trials', async () => {
            jest.spyOn(global, 'fetch').mockImplementationOnce(() => Promise.reject(() => {
                throw new Error('Test error');
            }))

            try {
                await repository.getOngoingTrials('FR');
            } catch(e: any) {
                expect(e.message).toEqual('Could not retrieve ongoing trials');
            }
        })
    })
})