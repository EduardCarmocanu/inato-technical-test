import { CountryModel } from "../models/country.model";

const countriesList: CountryModel[] = require('../../assets/countries.json');

export const countryService = () => {
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