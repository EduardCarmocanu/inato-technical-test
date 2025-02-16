import { describe, expect, it, jest } from '@jest/globals';
import { trialsController } from './trials.controller';
import { TrialModel } from '../models/trial.model';

const getOngoingTrialsMock = jest.fn()

jest.mock('../services/trials.service', () => ({
    trialsService: () => ({
        getOngoingTrials: getOngoingTrialsMock
    })
}))

describe('trialsController', () => {
    const testTrials: TrialModel[] = [
        {
            "name": "Trial 1",
            "start_date": "2019-01-01",
            "end_date": "2025-08-01",
            "sponsor": "Sponsor 1",
        },
        {
            "name": "Trial 2",
            "start_date": "2018-03-20",
            "end_date": "2032-09-10",
            "sponsor": "Sponsor 2",
        }
    ]

    const controller = trialsController();

    describe('getTrialsCountryOptions', () => {
        it('should return trials command options', () => {
            const options = controller.getTrialsCountryOptions();

            expect(options.flags).toEqual('-c, --country <FR,ES,IT,DE,AT>');
            expect(options.mandatory).toEqual(true);
        })
    })

    describe('streamOngoingTrials', () => {
        it('should output ongoing trials', async () => {
            jest.spyOn(console, 'log');
            getOngoingTrialsMock.mockReturnValue(Promise.resolve(testTrials))

            await controller.streamOngoingTrials({ country: 'FR' });

            testTrials.forEach(trial => {
                expect(console.log).toHaveBeenCalledWith(`${trial.name}, France`)
            })
        })
    })
})