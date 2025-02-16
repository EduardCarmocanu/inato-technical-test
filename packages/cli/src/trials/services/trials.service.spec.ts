import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { trialsService } from './trials.service';
import { TrialModel } from '../models/trial.model';

const getOngoingTrialsMock = jest.fn()

jest.mock('../repositories/trials.repository', () => ({
    trialsRepository: () => ({
        getOngoingTrials: getOngoingTrialsMock
    })
}))

describe('trialsService', () => {
    const service = trialsService();
    const testTrials: TrialModel[] = [
        {
            name: 'Trial 1',
            end_date: '2025-10-01',
            start_date: '2018-01-01',
            sponsor: 'Sponsor 1'
        },
        {
            name: 'Trial 2',
            end_date: '2025-10-01',
            start_date: '2018-01-01',
            sponsor: 'Sponsor 2'
        }
    ]

    beforeEach(() => {
        getOngoingTrialsMock.mockReturnValue(Promise.resolve(testTrials))
    })

    describe('getOngoingTrials', () => {
        it('should return a a list of ongoing trials', async () => {
            const result = await service.getOngoingTrials('FR')

            expect(result).toEqual(testTrials)
            expect(getOngoingTrialsMock).toHaveBeenCalledWith('FR');
        })
    })
})