import { ICLIOptions } from "../interfaces/cli-options.interface";
import { TrialModel } from "../models/trial.model";
import { countryService } from "../services/country.service";
import { trialsService } from "../services/trials.service"
import { Option } from "commander";

export const trialsController = () => {
    const { getOngoingTrials } = trialsService();
    const { getCountryName, getCountryCodeOptions } = countryService();

    const getTrialsCountryOptions = (): Option => {
            const options = getCountryCodeOptions();
    
            return new Option(
                `-c, --country <${options}>`,
                'Specifies the country filtering option')
                .choices(options)
                .makeOptionMandatory()
        }
    
    const streamOngoingTrials = async ({ country }: ICLIOptions): Promise<void> => {
        const trials = await getOngoingTrials(country);

        trials.forEach((trial: TrialModel) => {
            console.log(`${trial.name}, ${getCountryName(country)}`)
        });
    }

    return {
        streamOngoingTrials,
        getTrialsCountryOptions
    }
};