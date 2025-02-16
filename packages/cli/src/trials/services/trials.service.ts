import { TrialModel } from "../models/trial.model";
import { trialsRepository } from "../repositories/trials.repository"

export const trialsService = () => {
    const getOngoingTrials = async (country: string): Promise<TrialModel[]> => {
        return await trialsRepository().getOngoingTrials(country);
    }

    return {
        getOngoingTrials
    }
}