import { Option } from "commander";
import { countryService } from "../services/country.service"

export const optionsController = () => {
    const { getCountryCodeOptions } = countryService();

    const getTrialsCountryOptions = (): Option => {
        const options = getCountryCodeOptions();

        return new Option(
            `-c, --country <${options}>`,
            'Specifies the country filtering option')
            .choices(options)
            .makeOptionMandatory()
    }

    return {
        getTrialsCountryOptions
    }
}