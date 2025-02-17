import { CountryModel } from "../models/country.model";
import { countryRepository } from "../repositories/country.repository";

export const countryService = () => {
    const { getCountriesList } = countryRepository()

    const countriesList: CountryModel[] = getCountriesList();

    const getCountryName = (code: string): string => {
        const country = countriesList.find(country => country.code === code)

        if (!country) {
            throw new Error(`Country code ${code} does not exists`);
        }

        return country.name
    }

    const getCountryCodeOptions = (): string[] => {
        return countriesList.map((country) => country.code)
    }

    return {
        getCountryName,
        getCountryCodeOptions
    }
}