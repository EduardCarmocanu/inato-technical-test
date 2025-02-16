import { TrialModel } from "../models/trial.model";

const trialsApiBaseUrl = 'http://localhost:3000';

export const trialsRepository = () => {
    const getOngoingTrials = async (country: string): Promise<TrialModel[]> => {
        const url = new URL(`${trialsApiBaseUrl}/trials/ongoing`);

        if (country) {
            url.searchParams.set('country', country);
        }

        try {
            const response = await fetch(url);
            return JSON.parse(await response.text())
        } catch (e) {
            throw new Error('Could not retrieve ongoing trials')
        }
    }

    return {
        getOngoingTrials
    }
}