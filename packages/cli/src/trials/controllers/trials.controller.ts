import { ICLIOptions } from "../interfaces/cli-options.interface";
import { TrialModel } from "../models/trial.model";
import { countryService } from "../services/country.service";
import { trialsService } from "../services/trials.service"

export const trialsController = () => {
    const { getOngoingTrials } = trialsService();
    const { getCountryName } = countryService();

    const streamOngoingTrials = async ({ country }: ICLIOptions): Promise<void> => {
        const trials = await getOngoingTrials(country);

        trials.forEach((trial: TrialModel) => {
            console.log(`${trial.name}, ${getCountryName(country)}`)
        });
    }

    return {
        streamOngoingTrials
    }
}